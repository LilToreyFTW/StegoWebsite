"use client";

/**
 * Better Auth Sign Up Page
 * Standalone page for Better Auth email/password sign up
 * Alternative to Clerk sign up - both systems coexist
 */

import { BetterAuthSignUp } from "@/components/better-auth-signup";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function BetterAuthSignUpPage() {
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
          <BetterAuthSignUp />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Prefer Clerk?{" "}
              <Link href="/" className="text-primary hover:underline">
                Sign up with Clerk
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
