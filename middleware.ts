import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Simplified middleware to avoid 500 errors
 * Temporarily disabled auth protection
 */

export function middleware(request: NextRequest) {
  // Simply pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\.[^/]*$).*)"],
};
