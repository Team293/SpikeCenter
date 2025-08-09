'use client';

import { useState } from 'react';

import Logo from '@spike/ui/logo';
import { cn } from '@spike/ui/utils';

import AskAIButton from './ask-ai-button';
import IconButtons from './icon-buttons';
import PrimaryNav from './primary-nav';
import UserMenu from './user-menu';

type NavItem = { id: string; label: string; count?: number };
type NavData = {
  brand: { name: string };
  user: { name: string; role: string; initials: string };
  nav: NavItem[];
  counts: { messages?: number; notifications?: number };
  activeNavId?: string;
};

export default function TopNav({ data }: { data: NavData }) {
  const [active, setActive] = useState<string>(data.activeNavId ?? 'home');

  return (
    <header className="w-full border-b bg-white">
      <div className={cn('flex h-16 items-center gap-3 px-10')}>
        <div className="flex min-w-0 items-center gap-6">
          <Logo name={data.brand.name} />
          <AskAIButton />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <IconButtons
            messages={data.counts.messages ?? 0}
            notifications={data.counts.notifications ?? 0}
          />
          <UserMenu user={data.user} />
        </div>
      </div>

      <div className="px-10">
        <PrimaryNav items={data.nav} activeId={active} onChange={setActive} />
      </div>
    </header>
  );
}
