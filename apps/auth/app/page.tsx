import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@spike/auth';
import { asUrl } from '@spike/config/paths.config';

export default async function Page() {
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  // if authenticated, redirect to account page
  if (session) {
    redirect(asUrl('auth', 'account'));
  } else {
    redirect(asUrl('auth', 'login'));
  }

  // just show plain loader while redirecting to respective page
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      </div>
    </div>
  );
}
