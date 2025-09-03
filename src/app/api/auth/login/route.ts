import { NextResponse } from 'next/server';
import { signToken, setTokenCookie } from '@/server/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const token = signToken({ id: email, email });
    const res = NextResponse.json({ ok: true, email });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('Login error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
