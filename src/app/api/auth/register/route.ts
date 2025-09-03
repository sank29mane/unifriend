import { NextResponse } from 'next/server';
import { signToken, setTokenCookie } from '@/server/auth';

/**
 * Very basic register endpoint.
 * In a real app you would persist users and hash passwords.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // TODO: create user in DB and hash password

    const token = signToken({ id: 'new-user-id', email });
    const response = NextResponse.json({ ok: true, token });
    setTokenCookie(response, token);
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
