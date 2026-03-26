import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "craftwork_session";

const protectedPrefixes = ["/dashboard"];
const guestOnlyPrefixes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const needsAuth = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const guestOnly = guestOnlyPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (needsAuth && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (guestOnly && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
