/**
 * Better Auth v1.5.6 API Route
 * Catch-all route for Better Auth endpoints
 * This runs alongside Clerk - both auth systems coexist
 */

import { auth } from "@/lib/auth";

// Export the Better Auth handler for all /api/auth/* routes
export const { GET, POST, PUT, DELETE } = auth.handler;
