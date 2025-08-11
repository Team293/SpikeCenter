import { expo } from '@better-auth/expo';
import { db, schema } from '@spike/db';
import serverEnv from '@spike/env/env.server';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, bearer, magicLink, organization } from 'better-auth/plugins';

import { baseAvatarPlugin } from './plugins/base-avatar-plugin';

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  appName: 'Spike Suite',
  plugins: [
    expo(),
    baseAvatarPlugin(),
    bearer(),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        console.log('Sending magic link to:', email);
        console.log('Token:', token);
        console.log('URL:', url);
      },
    }),
    admin(),
    organization({
      organizationCreation: {
        disabled: false,
        afterCreate: async ({ organization, member, user }) => {},
      },
      // sendInvitationEmail: async
    }),
    nextCookies(),
  ],
  advanced: {
    cookiePrefix: 'spike',
    useSecureCookies: serverEnv.NODE_ENV === 'production',
    crossSubDomainCookies:
      serverEnv.NODE_ENV === 'production'
        ? {
            enabled: true,
            domain: '.spike.center',
          }
        : {
            enabled: false,
          },
  },
  trustedOrigins: [
    'https://auth.staging.spike.center',
    'https://auth.spike.center',
    'http://localhost:3001',
  ],
  emailVerification: {
    sendOnSignUp: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        console.log('token: ' + token);
      },
    },
  },
  socialProviders: {
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    },
  },
});

export { auth };
