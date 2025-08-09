import '@spike/ui/styles/globals.css';

import { Providers } from '~/components/providers';
import TopNav from '~/components/top-nav/top-nav';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = 'en';

  const data = {
    brand: { name: 'trenning' },
    user: { name: 'Adit Irwan', role: 'Jr UI/UX Designer', initials: 'AI' },
    nav: [
      { id: 'home', label: 'Home' },
      { id: 'learning', label: 'My Learning' },
      { id: 'catalog', label: 'Catalog' },
      { id: 'favorites', label: 'Favorites', count: 1 },
    ],
    counts: { messages: 2, notifications: 3 },
    activeNavId: 'home',
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <Providers>
          <TopNav data={data} />
          <div className="flex flex-col px-10 py-8">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
