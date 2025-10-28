/**
 * Middleware for route protection
 *
 * Protects country detail pages (/country/*) requiring authentication.
 * Redirects unauthenticated users to countries list with login prompt.
 */

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/country/")) {
    if (!req.auth) {
      const countriesUrl = new URL("/countries", req.url);
      countriesUrl.searchParams.set("loginRequired", "true");
      countriesUrl.searchParams.set("attempted", pathname);
      return NextResponse.redirect(countriesUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/country/:path*"],
};
