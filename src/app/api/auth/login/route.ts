import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, setTokenCookie } from '../../../server/auth';

// In a real application this would be replaced with database lookup
const mockUser = {
  id: '1',
  email: 'demo@example.com',
  password: 'password123',
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email !== mockUser.email || password !== mockUser.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: mockUser.id, email: mockUser.email });
    const res = NextResponse.json({ message: 'Login successful' });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
