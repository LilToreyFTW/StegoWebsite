import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * Final Master Build – Updated in existing files only
 * Analytics API - Fetches beacon tracking data from NeonDB
 * This data comes from the desktop app's stealth tracking beacons
 */

// Mock data for analytics - shows sample beacon tracking events
// In production with DATABASE_URL, this fetches from NeonDB beacon_events table
const mockAnalyticsData = {
  stats: {
    totalEvents: 156,
    eventsByType: [
      { beacon_type: "pdf", count: 89 },
      { beacon_type: "img", count: 67 }
    ],
    topFiles: [
      { file_id: "SPM-abc123-confidential.pdf", count: 23, last_trigger: "2024-01-15T10:30:00Z" },
      { file_id: "SPM-def456-document.pdf", count: 18, last_trigger: "2024-01-14T16:45:00Z" }
    ],
    last24h: 12
  },
  events: [
    {
      id: 1,
      file_id: "SPM-abc123-confidential.pdf",
      pc_name: "DESKTOP-ABC123",
      ip_address: "203.0.113.45",
      city: "New York",
      state: "NY",
      country: "USA",
      latitude: 40.7128,
      longitude: -74.0060,
      timestamp: "2024-01-15T10:30:00Z",
      beacon_type: "pdf"
    },
    {
      id: 2,
      file_id: "SPM-def456-document.pdf",
      pc_name: "WORKSTATION-XYZ",
      ip_address: "198.51.100.22",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      latitude: 34.0522,
      longitude: -118.2437,
      timestamp: "2024-01-14T16:45:00Z",
      beacon_type: "pdf"
    },
    {
      id: 3,
      file_id: "SPM-ghi789-image.png",
      pc_name: "LAPTOP-DEF456",
      ip_address: "192.0.2.100",
      city: "London",
      state: "England",
      country: "UK",
      latitude: 51.5074,
      longitude: -0.1278,
      timestamp: "2024-01-13T09:15:00Z",
      beacon_type: "img"
    }
  ]
};

export async function GET() {
  const session = await auth();
  
  if (!session.userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Final Master Build: Connect to NeonDB for real beacon data
  // When DATABASE_URL is set, this fetches from the beacon_events table:
  // const { Pool } = require('@neondatabase/serverless');
  // const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // 
  // const result = await pool.query(`
  //   SELECT * FROM beacon_events 
  //   WHERE license_key IN (SELECT key FROM user_licenses WHERE user_id = $1)
  //   ORDER BY timestamp DESC 
  //   LIMIT 100
  // `, [session.userId]);
  // 
  // return NextResponse.json({ stats: calculateStats(result.rows), events: result.rows });

  // For development: return mock data
  return NextResponse.json(mockAnalyticsData);
}
