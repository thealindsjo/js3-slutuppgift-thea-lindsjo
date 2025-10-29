/**
 * Middleware (currently disabled)
 *
 * Using client-side auth check in CountryCard instead of server-side middleware
 */

import { NextResponse } from "next/server";

export function middleware() {
  // Pass through all requests without modification
  return NextResponse.next();
}
