// src/server/api/auth/me.ts
import { NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/server/auth';

export async function GET(request: Request) {
  const token = getTokenFromRequest(request as any); // cast because NextRequest not imported here
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  return NextResponse.json({ user: payload });
}
