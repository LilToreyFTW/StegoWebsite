"use client";

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { 
  User, 
  Key, 
  FileText, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  Mail,
  Calendar
} from "lucide-react";
// Better Auth v1.5.6 imports - runs alongside Clerk
import { BetterAuthSessionInfo } from "@/components/better-auth-session-info";
import { useSession } from "@/components/better-auth-provider";

interface LicenseKey {
  id: string;
  key: string;
  type: string;
  status: "active" | "redeemed" | "expired";
  purchasedAt: string;
  redeemedAt?: string;
  expiresAt?: string;
}

interface Receipt {
  id: string;
  keyType: string;
  amount: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  processedAt?: string;
  note?: string;
}

export function AccountClient() {
  const [activeTab, setActiveTab] = useState<"keys" | "receipts" | "profile">("keys");
  // Better Auth v1.5.6 session hook - runs alongside Clerk
  const { data: betterAuthSession } = useSession();
  const isBetterAuthSignedIn = !!betterAuthSession?.user;
  
  const [keys] = useState<LicenseKey[]>([
    {
      id: "key_001",
      key: "SPM-ABCD-EFGH-IJKL",
      type: "24-Hour",
      status: "redeemed",
      purchasedAt: "2024-01-15",
      redeemedAt: "2024-01-15"
    }
  ]);

  const [receipts] = useState<Receipt[]>([
    {
      id: "rec_001",
      keyType: "24-Hour Access",
      amount: "$5",
      status: "approved",
      submittedAt: "2024-01-15",
      processedAt: "2024-01-15"
    },
    {
      id: "rec_002",
      keyType: "7-Day Access",
      amount: "$15",
      status: "pending",
      submittedAt: "2024-01-20",
      note: "Payment verification in progress"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "approved": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "redeemed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "redeemed":
        return <Download className="h-4 w-4" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        <p className="text-muted-foreground">
          Manage your profile, licenses, and receipt history.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="rounded-lg border border-border bg-card p-6 mb-8">
        <div className="flex items-center gap-4">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-16 h-16"
              }
            }}
          />
          <div>
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("keys")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "keys"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              License Keys
            </div>
          </button>
          <button
            onClick={() => setActiveTab("receipts")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "receipts"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Receipt History
            </div>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile Settings
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {activeTab === "keys" && (
          <div>
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Your License Keys</h3>
              <a
                href="/buy-keys"
                className="text-sm text-primary hover:underline"
              >
                Buy New Key
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Key</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Purchased</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Redeemed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {keys.map((key) => (
                    <tr key={key.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-sm">{key.key}</td>
                      <td className="px-6 py-4">{key.type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(key.status)}`}>
                          {getStatusIcon(key.status)}
                          {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">{key.purchasedAt}</td>
                      <td className="px-6 py-4">{key.redeemedAt || "-"}</td>
                    </tr>
                  ))}
                  {keys.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        No license keys found. Purchase a key to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "receipts" && (
          <div>
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-semibold">Payment Receipts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Receipt ID</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Package</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Amount</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {receipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-sm">{receipt.id}</td>
                      <td className="px-6 py-4">{receipt.keyType}</td>
                      <td className="px-6 py-4">{receipt.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(receipt.status)}`}>
                          {getStatusIcon(receipt.status)}
                          {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">{receipt.submittedAt}</td>
                    </tr>
                  ))}
                  {receipts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        No receipts found. Submit a receipt after making a payment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email Address</h4>
                  <p className="text-sm text-muted-foreground">
                    Your license keys will be sent to your registered email address.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Your account is secured by Clerk authentication.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Member Since</h4>
                  <p className="text-sm text-muted-foreground">
                    Account created on January 15, 2024
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Active Licenses</h4>
                  <p className="text-sm text-muted-foreground">
                    You have {keys.length} license key(s) associated with your account.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Better Auth v1.5.6 Session Info - runs alongside Clerk */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Better Auth Session</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Alternative authentication system status (runs alongside Clerk)
              </p>
              <BetterAuthSessionInfo />
              {isBetterAuthSignedIn && (
                <div className="mt-4 p-4 rounded-md bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-blue-400">
                    You are currently signed in with Better Auth. Both auth systems are active.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
