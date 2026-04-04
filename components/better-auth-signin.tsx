"use client";

/**
 * Better Auth v1.5.6 Sign In Component
 * Alternative sign-in option that runs alongside Clerk
 * Users can choose between Clerk or Better Auth
 */

import { useState } from "react";
import { signIn } from "@/components/better-auth-provider";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

interface BetterAuthSignInProps {
  onSuccess?: () => void;
  onSwitchToClerk?: () => void;
}

export function BetterAuthSignIn({ onSuccess, onSwitchToClerk }: BetterAuthSignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(result.error.message || "Sign in failed");
      } else {
        setSuccess(true);
        onSuccess?.();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg border border-border bg-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Sign in with Better Auth</h3>
        <p className="text-sm text-muted-foreground">
          Alternative authentication using email and password
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Sign in successful! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {onSwitchToClerk && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={onSwitchToClerk}
            className="w-full py-2 px-4 rounded-md border border-border bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
          >
            Switch to Clerk Sign In
          </button>
        </div>
      )}
    </div>
  );
}
