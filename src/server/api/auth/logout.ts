// src/server/api/auth/logout.ts
import { NextResponse } from 'next/server';
import { clearTokenCookie } from '@/server/auth';

export async function POST(_request: Request) {
  const res = NextResponse.json({ ok: true });
  clearTokenCookie(res);
  return res;
}
