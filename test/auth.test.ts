/** @jest-environment node */

import { signToken, verifyToken } from '@/server/auth';
import type { UserPayload } from '@/server/auth';

describe('auth token signing and verification', () => {
  const userPayload: UserPayload = {
    id: 'clxshz8o1000008l3fczj5yvh',
    email: 'test@example.com',
  };

  it('should correctly sign a user payload', () => {
    const token = signToken(userPayload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  it('should verify a valid token and return the correct payload', () => {
    const token = signToken(userPayload);
    const decoded = verifyToken(token);

    // verifyToken returns a payload that includes iat (issued at) and exp (expires at)
    // We only need to check for the properties we signed.
    expect(decoded).not.toBeNull();
    expect(decoded?.id).toBe(userPayload.id);
    expect(decoded?.email).toBe(userPayload.email);
  });

  it('should return null for an invalid or malformed token', () => {
    const decoded = verifyToken('invalid-token-string');
    expect(decoded).toBeNull();
  });

  it('should return null for a token signed with a different secret', () => {
    const token = signToken(userPayload);
    
    // Temporarily change the secret to simulate a different signing key
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'a-completely-different-secret';

    const decoded = verifyToken(token);
    expect(decoded).toBeNull();

    // Restore the original secret for other tests
    process.env.JWT_SECRET = originalSecret;
  });
});
