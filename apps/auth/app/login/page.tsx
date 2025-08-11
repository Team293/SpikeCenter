import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@spike/auth';
import { asUrl } from '@spike/config/paths.config';

import { LoginForm } from '~/components/login-form';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  if (session) {
    redirect(asUrl('landing', 'root'));
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
