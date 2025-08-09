'use server';

import { headers } from 'next/headers';

import { auth } from '@spike/auth';

export async function loginWithMagicLinkAction({
  email,
  redirectUrl,
}: {
  email: string;
  redirectUrl: string;
}) {
  await auth.api.signInMagicLink({
    body: {
      email,
      callbackURL: redirectUrl,
    },
    headers: await headers(),
  });
}
