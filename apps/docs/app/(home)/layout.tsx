import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  redirect('/docs')
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
