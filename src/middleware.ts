import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const protectedPath = '/';

  if (req.nextUrl.pathname === protectedPath) {
    const session = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
    });

    if (!session) {
      const signInUrl = new URL('/auth/login', req.nextUrl.origin);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
