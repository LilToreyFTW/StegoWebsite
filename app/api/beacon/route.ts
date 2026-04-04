import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

export const runtime = 'edge';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      license_key, 
      hardware_fingerprint, 
      event_type, 
      metadata,
      ip_address,
      user_agent,
      file_hash,
      beacon_id 
    } = body;

    const client = await pool.connect();
    
    try {
      await client.query(
        `INSERT INTO beacon_events 
         (license_key, hardware_fingerprint, event_type, metadata, ip_address, user_agent, file_hash, beacon_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [license_key, hardware_fingerprint, event_type, JSON.stringify(metadata), ip_address, user_agent, file_hash, beacon_id]
      );

      return NextResponse.json({ success: true, message: 'Beacon recorded' });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Beacon error:', error);
    return NextResponse.json({ error: 'Failed to record beacon' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const license_key = searchParams.get('license_key');

    if (!license_key) {
      return NextResponse.json({ error: 'License key required' }, { status: 400 });
    }

    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'SELECT * FROM beacon_events WHERE license_key = $1 ORDER BY created_at DESC LIMIT 100',
        [license_key]
      );

      return NextResponse.json({ success: true, events: result.rows });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Beacon fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch beacons' }, { status: 500 });
  }
}
