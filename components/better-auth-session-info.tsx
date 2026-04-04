"use client";

/**
 * Better Auth v1.5.6 Session Display Component
 * Shows current Better Auth session info
 * Runs alongside Clerk - both auth systems coexist
 */

import { useSession } from "@/components/better-auth-provider";
import { Shield, CheckCircle } from "lucide-react";

export function BetterAuthSessionInfo() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="p-4 rounded-lg border border-border bg-card animate-pulse">
        <div className="h-4 w-32 bg-muted rounded" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span className="text-sm">Not signed in with Better Auth</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="h-4 w-4 text-green-400" />
        <span className="text-sm font-medium">Signed in with Better Auth</span>
      </div>
      <div className="space-y-1 text-sm">
        <p><span className="text-muted-foreground">Name:</span> {session.user.name}</p>
        <p><span className="text-muted-foreground">Email:</span> {session.user.email}</p>
        <p><span className="text-muted-foreground">Session ID:</span> <span className="font-mono text-xs">{session.session.id.slice(0, 8)}...</span></p>
      </div>
    </div>
  );
}
