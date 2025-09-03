import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clearTokenCookie } from '../../../server/auth';

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: 'Logged out' });
  clearTokenCookie(res);
  return res;
}
