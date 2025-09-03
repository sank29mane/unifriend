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

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
