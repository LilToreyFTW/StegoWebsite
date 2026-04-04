"use client";

/**
 * Better Auth Sign In Page
 * Standalone page for Better Auth email/password sign in
 * Alternative to Clerk sign in - both systems coexist
 */

import { BetterAuthSignIn } from "@/components/better-auth-signin";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function BetterAuthSignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold">StegoProxy</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <BetterAuthSignIn />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Prefer Clerk?{" "}
              <Link href="/" className="text-primary hover:underline">
                Sign in with Clerk
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
