"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Key, 
  Eye, 
  ShoppingCart, 
  FileText,
  ArrowRight,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface QuickStat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  href?: string;
}

interface RecentActivity {
  id: string;
  type: "grab" | "receipt" | "key";
  description: string;
  timestamp: string;
  status?: string;
}

export function DashboardClient() {
  const [stats, setStats] = useState<QuickStat[]>([
    { label: "Active Keys", value: 1, icon: <Key className="h-4 w-4" />, href: "/account" },
    { label: "Total Grabs", value: 0, icon: <Eye className="h-4 w-4" />, href: "/analytics" },
    { label: "Pending Receipts", value: 1, icon: <FileText className="h-4 w-4" />, href: "/buy-keys" },
  ]);
  
  const [activities, setActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "receipt",
      description: "Receipt submitted for 7-Day Access",
      timestamp: new Date().toISOString(),
      status: "pending"
    },
    {
      id: "2",
      type: "key",
      description: "24-Hour key redeemed",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: "completed"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "grab": return <Eye className="h-4 w-4 text-primary" />;
      case "receipt": return <FileText className="h-4 w-4 text-yellow-400" />;
      case "key": return <Key className="h-4 w-4 text-green-400" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-400" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
        </div>
        <button
          onClick={refreshData}
          disabled={loading}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href || "#"}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
          >
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="text-primary">{stat.icon}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickActionCard
                icon={<ShoppingCart className="h-5 w-5" />}
                title="Buy Keys"
                description="Purchase license keys via Buy Me a Coffee"
                href="/buy-keys"
              />
              <QuickActionCard
                icon={<LayoutDashboard className="h-5 w-5" />}
                title="View Analytics"
                description="Check tracking data and file opens"
                href="/analytics"
              />
              <QuickActionCard
                icon={<Key className="h-5 w-5" />}
                title="Redeem Key"
                description="Redeem your license key for download"
                href="/download"
              />
              <QuickActionCard
                icon={<FileText className="h-5 w-5" />}
                title="View Receipts"
                description="Check your payment receipt status"
                href="/buy-keys"
              />
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Status</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">License Server</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Beacon Tracking</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent activity
              </p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                      {getStatusIcon(activity.status)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            href="/account"
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-6"
          >
            View all activity <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ 
  icon, 
  title, 
  description, 
  href 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-md border border-border bg-muted/50 p-4 hover:border-primary/50 transition-colors"
    >
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
