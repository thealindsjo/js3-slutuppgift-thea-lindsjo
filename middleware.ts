// export { auth as middleware } from "@/auth";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  
  // Skydda /country/* rutter
  if (pathname.startsWith("/country/")) {
    if (!req.auth) {
      const countriesUrl = new URL("/countries", req.url);
      countriesUrl.searchParams.set("loginRequired", "true");
      countriesUrl.searchParams.set("attempted", pathname);
      return NextResponse.redirect(countriesUrl);
    }
  }
});

export const config = {
  matcher: ["/country/:path*"]
};