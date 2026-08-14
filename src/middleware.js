import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const signInUrl = new URL(
    `${process.env.NEXTAUTH_URL || "https://www.tc1928.com"}/auth/signin`,
  );
  signInUrl.search = "";

  return NextResponse.redirect(signInUrl.toString());
}

export const config = {
  matcher: ["/admin/:path*"],
};
