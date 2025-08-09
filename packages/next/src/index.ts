import { cookies, headers as nextHeaders } from 'next/headers';

import { _appRouter } from '@spike/api';
import { createContext } from '@spike/api/context';
import sharedEnv from '@spike/env/env.shared';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export async function getAuthHeaders() {
  const nextCookies = await cookies();
  const incomingHeaders = await nextHeaders();

  const headers: Record<string, string> = {};

  const authHeader = incomingHeaders.get('authorization');
  if (authHeader) headers['authorization'] = authHeader;

  // check the cookies for a bearer token
  if (!authHeader) {
    const bearerToken = nextCookies.get('bearer')?.value;
    if (bearerToken) {
      headers['authorization'] = `Bearer ${bearerToken}`;
    }
  }

  return headers;
}

export async function trpcServerCall<T>(
  callback: (caller: ReturnType<typeof _appRouter.createCaller>) => Promise<T>,
): Promise<T> {
  const authHeader = (await nextHeaders()).get('authorization') || null;
  const ctx = await createContext({ authHeader });
  const caller = _appRouter.createCaller(ctx);
  return callback(caller);
}
