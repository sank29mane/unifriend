import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const TOKEN_COOKIE_NAME = 'auth_token';

export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

/**
 * Generate a signed JWT for the given user.
 */
export function signToken(user: { id: string; email: string }): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}

/**
 * Verify a token. Returns the decoded payload or null if invalid.
 */
export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Retrieve the auth token from the request cookie.
 */
export function getTokenFromRequest(req: NextRequest): string | undefined {
  return req.cookies.get(TOKEN_COOKIE_NAME)?.value;
}

/**
 * Set the auth token cookie on the response.
 */
export function setTokenCookie(res: NextResponse, token: string): void {
  res.cookies.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 hour
    sameSite: 'lax',
  });
}

/**
 * Clear the auth token cookie.
 */
export function clearTokenCookie(res: NextResponse): void {
  res.cookies.set(TOKEN_COOKIE_NAME, '', {
    maxAge: -1,
    path: '/',
  });
}
