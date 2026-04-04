"use client";

/**
 * Better Auth v1.5.6 User Button Component
 * Displays user info and sign out button for Better Auth sessions
 * Runs alongside Clerk UserButton - both auth systems coexist
 */

import { useUser, signOut } from "@/components/better-auth-provider";
import { useState } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";

interface BetterAuthUserButtonProps {
  afterSignOutUrl?: string;
}

export function BetterAuthUserButton({ afterSignOutUrl = "/" }: BetterAuthUserButtonProps) {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      callbackURL: afterSignOutUrl,
    });
  };

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-medium hidden sm:block">
          {user.name || user.email}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-card shadow-lg z-50">
            <div className="p-4 border-b border-border">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <p className="text-xs text-primary mt-1">Better Auth</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-muted transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
