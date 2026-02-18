import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const intlMiddleware = createMiddleware(routing);

function isValidAdminToken(token: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const databaseUrl = process.env.DATABASE_URL;

  if (!adminPassword || !databaseUrl) return false;

  const expectedToken = crypto
    .createHash("sha256")
    .update(adminPassword + databaseUrl)
    .digest("hex");

  return token === expectedToken;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes
  if (pathname.startsWith("/admin")) {
    // Allow the login page and API routes without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for valid admin token
    const token = request.cookies.get("admin-token")?.value;

    if (!token || !isValidAdminToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Handle API routes - pass through
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Handle internationalized routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(sr|en)/:path*", "/admin/:path*"],
};
