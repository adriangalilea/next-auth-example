import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Custom logic for your middleware if needed
  if (request.nextUrl.pathname === "/api/auth/verify-request") {
    return NextResponse.redirect(new URL("/auth/verify-request", request.url));
  }
}

export const config = {
  matcher: ["/api/auth/verify-request", "/another-protected-route"],
};
