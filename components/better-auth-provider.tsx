/**
 * Better Auth v1.5.6 Client Provider
 * Provides Better Auth session context to React components
 * Runs alongside ClerkProvider - both auth systems coexist
 */

"use client";

import { createAuthClient } from "better-auth/react";
import { ReactNode } from "react";

// Create Better Auth client for React
// This is separate from Clerk and provides an alternative auth method
export const betterAuthClient = createAuthClient({
  // Base URL for auth API
  baseURL: "/api/auth",
});

// Export hooks for use in components
export const {
  useSession,
  signIn,
  signUp,
  signOut,
  revokeSession,
  updateUser,
} = betterAuthClient;

// Better Auth Provider component
// Wraps children with Better Auth context
// Note: This runs alongside ClerkProvider in the root layout
interface BetterAuthProviderProps {
  children: ReactNode;
}

export function BetterAuthProvider({ children }: BetterAuthProviderProps) {
  // Better Auth client is initialized via the hooks above
  // The provider functionality is built into the hooks
  // We wrap children to maintain React hierarchy
  return (
    <>{children}</>
  );
}
