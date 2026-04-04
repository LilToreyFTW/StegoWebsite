/**
 * Better Auth v1.5.6 Configuration
 * This file configures Better Auth to work alongside Clerk authentication
 * Both auth systems coexist in the same project
 */

import { betterAuth } from "better-auth";
import { neon } from "@neondatabase/serverless";

// Better Auth configuration using NeonDB from the existing neondb_api
// This runs alongside Clerk - both auth systems are available
export const auth = betterAuth({
  // Database configuration - uses the same NeonDB as the license API
  database: {
    // Using NeonDB serverless client
    // Connection string should be set in environment variables
    // DATABASE_URL from the existing neondb_api setup
    provider: "postgres",
    url: process.env.DATABASE_URL || "",
  },

  // Authentication providers
  emailAndPassword: {
    enabled: true,
    // Allow users to sign up with email/password
    autoSignIn: true,
  },

  // Social providers can be added here
  socialProviders: {},

  // Session configuration
  session: {
    // Session expires in 7 days
    expiresIn: 60 * 60 * 24 * 7,
    // Update session every day
    updateAge: 60 * 60 * 24,
  },

  // Advanced options
  advanced: {
    // Use secure cookies in production
    useSecureCookies: process.env.NODE_ENV === "production",
    // Disable default redirect
    disableDefaultRedirect: true,
  },

  // Custom paths - using /api/auth for Better Auth to avoid conflicts with Clerk
  path: "/api/auth",

  // App name for emails and UI
  appName: "StegoProxy Masker",
});

// Export types for TypeScript support
export type Auth = typeof auth;
