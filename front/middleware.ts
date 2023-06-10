import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/404', request.url))
}


export const config = { matcher: ["/dashboard/:path*", "/project/:path*"] }
