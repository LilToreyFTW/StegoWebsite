import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Final Master Build – Updated in existing files only
 * Clerk middleware for authentication
 * Runs alongside Better Auth v1.5.6 - both auth systems coexist
 */

const isProtectedRoute = createRouteMatcher([
  "/analytics",
  "/buy-keys",
  "/download",
  "/dashboard",
  "/account",
  "/api/protected",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Continue without protection if auth fails
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\.[^/]*$).*)"],
};
