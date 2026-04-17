import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

async function isValidAdminToken(token: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) return false;

  // Use Web Crypto API (available in Edge runtime)
  const encoder = new TextEncoder();
  const data = encoder.encode(adminPassword);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expectedToken = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return token === expectedToken;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin API routes - require authentication
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin-token")?.value;

    if (!token || !(await isValidAdminToken(token))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith("/admin")) {
    // Allow the login page without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for valid admin token
    const token = request.cookies.get("admin-token")?.value;

    if (!token || !(await isValidAdminToken(token))) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Handle other API routes - pass through
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Handle internationalized routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(sr|en)/:path*", "/admin/:path*"],
};
