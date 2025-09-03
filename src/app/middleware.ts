import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getTokenFromRequest } from '../server/auth';

/**
 * Middleware that attaches the authenticated user to a custom header.
 * Protected routes can then use `headers.get('x-user')` to access the payload.
 */
export async function middleware(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (token) {
    const user = verifyToken(token);
    if (user) {
      const res = NextResponse.next();
      res.headers.set('x-user', JSON.stringify(user));
      return res;
    }
  }

  // If the requested path is under /dashboard and user is not authenticated,
  // redirect to a public landing or login page.
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/dashboard')) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    // Clear the invalid token and redirect
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}
