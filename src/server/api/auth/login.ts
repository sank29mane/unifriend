// src/server/api/auth/login.ts
import { NextResponse } from 'next/server';
import { signToken, setTokenCookie } from '@/server/auth';

/**
 * Simple login endpoint that accepts any email/password and returns a JWT.
 * In production you would validate credentials against your user store.
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation – replace with real auth logic.
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // For demo purposes we treat the email as the unique id.
    const token = signToken({ id: email, email });

    const res = NextResponse.json({ ok: true, email });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('Login error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
