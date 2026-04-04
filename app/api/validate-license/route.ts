import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

export const runtime = 'edge';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { license_key, hardware_fingerprint } = body;

    if (!license_key) {
      return NextResponse.json({ error: 'License key required' }, { status: 400 });
    }

    const client = await pool.connect();
    
    try {
      // Check if license exists and is valid
      const result = await client.query(
        'SELECT * FROM licenses WHERE license_key = $1 AND is_active = true',
        [license_key]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Invalid or inactive license' }, { status: 404 });
      }

      const license = result.rows[0];

      // Check if already bound to another device
      if (license.hardware_fingerprint && license.hardware_fingerprint !== hardware_fingerprint) {
        return NextResponse.json({ error: 'License already bound to another device' }, { status: 403 });
      }

      // Check expiration
      if (license.expires_at && new Date(license.expires_at) < new Date()) {
        return NextResponse.json({ error: 'License expired' }, { status: 403 });
      }

      // Bind to device if not already bound
      if (!license.hardware_fingerprint) {
        await client.query(
          'UPDATE licenses SET hardware_fingerprint = $1, activated_at = NOW() WHERE license_key = $2',
          [hardware_fingerprint, license_key]
        );
      }

      return NextResponse.json({
        success: true,
        license: {
          key: license.license_key,
          type: license.license_type,
          expires_at: license.expires_at,
          activated_at: license.activated_at || new Date().toISOString()
        },
        message: 'License validated successfully'
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
