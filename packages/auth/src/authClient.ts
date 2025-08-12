import sharedEnv from '@spike/env/env.shared';
import { createAuthClient } from 'better-auth/client';
import {
  adminClient,
  magicLinkClient,
  organizationClient,
} from 'better-auth/client/plugins';

const getLocalStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    /* noop: window or localStorage unavailable */
  }
  return null;
};

export const authClient = createAuthClient({
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get('set-auth-token');

      if (authToken) {
        getLocalStorage()?.setItem('bearer', authToken);
      }
    },
    auth: {
      type: 'Bearer',
      token: () => getLocalStorage()?.getItem('bearer') || '',
    },
    credentials: 'include',
  },
  plugins: [magicLinkClient(), adminClient(), organizationClient()],
});
