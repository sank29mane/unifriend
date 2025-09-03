// src/server/api/auth/me.ts
import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/server/auth';

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  return NextResponse.json({ user: payload });
}
