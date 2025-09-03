import { NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/server/auth';

export async function GET(request: Request) {
  const token = getTokenFromRequest(request as any);
  if (!token) return NextResponse.json({ user: null });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ user: null });

  return NextResponse.json({ user: { id: payload.id, email: payload.email } });
}
