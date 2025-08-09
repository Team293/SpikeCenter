import { verifyBearerToken } from '@spike/auth/verify-bearer';
import { db } from '@spike/db';

export async function createContext({
  authHeader,
}: {
  authHeader: string | null;
}) {
  let token: string | null = null;
  let user = null;

  if (authHeader?.startsWith('Bearer')) {
    token = authHeader.substring(7);

    try {
      const userFromToken = await verifyBearerToken(token);
      if (userFromToken) {
        user = userFromToken;
      }
    } catch (error) {
      // not verified
      console.error('Error verifying token:', error);
    }
  }

  return {
    user: user,
    isAuthenticated: !!user,
    db: db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
