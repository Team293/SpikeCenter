import sharedEnv from '@spike/env/env.shared';
import { createAuthClient } from 'better-auth/client';
import {
  adminClient,
  magicLinkClient,
  organizationClient,
} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get('set-auth-token');

      if (authToken) {
        localStorage.setItem('bearer', authToken);
      }
    },
    auth: {
      type: 'Bearer',
      token: () => localStorage.getItem('bearer') || '',
    },
    credentials: 'include',
  },
  plugins: [magicLinkClient(), adminClient(), organizationClient()],
});
