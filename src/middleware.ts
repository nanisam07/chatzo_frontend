import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  // Future auth token matching logic for route groups can be declared here.
  // E.g., redirecting requests in (dashboard) group to (auth)/login if no token is found.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (/api/*)
     * - static files (_next/static/*, _next/image/*)
     * - standard browser assets (favicon.ico, robots.txt, sitemap.xml)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
