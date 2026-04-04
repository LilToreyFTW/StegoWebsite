"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Eye, 
  MapPin, 
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

interface BeaconStats {
  totalEvents: number;
  eventsByType: { beacon_type: string; count: number }[];
  topFiles: { file_id: string; count: number; last_trigger: string }[];
  last24h: number;
}

interface BeaconEvent {
  id: number;
  file_id: string;
  pc_name: string;
  ip_address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  beacon_type: string;
}

export function AnalyticsClient() {
  const [stats, setStats] = useState<BeaconStats | null>(null);
  const [events, setEvents] = useState<BeaconEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/analytics");
      if (!response.ok) throw new Error("Failed to fetch analytics");
      const data = await response.json();
      setStats(data.stats);
      setEvents(data.events || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const exportToCSV = () => {
    if (events.length === 0) return;
    
    const headers = ["ID", "File ID", "PC Name", "IP Address", "Location", "Timestamp", "Type"];
    const rows = events.map(e => [
      e.id,
      e.file_id,
      e.pc_name,
      e.ip_address,
      `${e.city}, ${e.state}, ${e.country}`,
      new Date(e.timestamp).toLocaleString(),
      e.beacon_type
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Real-time tracking data from your files</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="Total Opens"
          value={stats?.totalEvents || 0}
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          label="Last 24 Hours"
          value={stats?.last24h || 0}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Top File"
          value={stats?.topFiles[0]?.file_id.split("-")[0] || "N/A"}
        />
        <StatCard
          icon={<MapPin className="h-5 w-5" />}
          label="Unique Locations"
          value={new Set(events.map(e => `${e.city},${e.state}`)).size}
        />
      </div>

      {/* Events Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold">Recent Opens</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">File</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Location</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Device</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Time</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.slice(0, 20).map((event) => (
                <tr key={event.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{event.file_id}</td>
                  <td className="px-6 py-4">
                    {event.city && event.country 
                      ? `${event.city}, ${event.country}` 
                      : "Unknown"}
                  </td>
                  <td className="px-6 py-4">{event.pc_name || "Unknown"}</td>
                  <td className="px-6 py-4">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {event.beacon_type}
                    </span>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No tracking data available yet. Process files with the beacon enabled to see data here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-primary">{icon}</div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
