// src/app/_middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/server/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard and any nested routes.
  if (pathname.startsWith('/dashboard')) {
    const token = getTokenFromRequest(request);
    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  }

  // Allow all other routes.
  return NextResponse.next();
}
