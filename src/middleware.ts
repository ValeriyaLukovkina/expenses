import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const protectedRedirect = ['/categories:path*'];

const protectedNoRedirect = ['/api/:path*'];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
  });
  const { pathname, origin } = req.nextUrl;

  if (
    pathname === '/' ||
    protectedRedirect.some((url) => pathname.startsWith(url.replace(':path*', '')))
  ) {
    if (!token) {
      const loginUrl = new URL('/auth/login', origin);

      return NextResponse.redirect(loginUrl);
    }
  }

  if (protectedNoRedirect.some((url) => pathname.startsWith(url.replace(':path*', '')))) {
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRedirect, ...protectedNoRedirect],
};
