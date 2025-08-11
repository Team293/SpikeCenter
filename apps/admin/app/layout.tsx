import { auth } from '@spike/auth';
import '@spike/ui/styles/globals.css';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { asUrl } from '@spike/config/paths.config'

import { Providers } from '~/components/providers';
import { AppSidebar } from '~/components/sidebar/app-sidebar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = 'en';

  const session = await auth.api.getSession({
      headers: await headers()
  });

  if (!session || !session.user) {
      redirect(asUrl('auth', 'login'));
  }

  if (session.user.role !== 'admin') {
    redirect(asUrl('landing', 'root'));
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <AppSidebar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
