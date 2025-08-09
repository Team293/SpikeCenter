'use client';

import { Session } from '@spike/auth/types';
import { lmsUser } from '@spike/db';
import { Book, Coins, LucideIcon, Medal } from 'lucide-react';

import { HeadingText } from './heading-text';
import { StatCard } from './stat-card';

interface SubHeaderProps {
  session: Session;
  lmsUser: typeof lmsUser.$inferSelect;
}

interface Stat {
  label: string;
  stat: (user: typeof lmsUser.$inferSelect) => number;
  icon: LucideIcon;
}

const stats: Stat[] = [
  {
    label: 'Points',
    stat: (user) => user.points,
    icon: Coins,
  },
  {
    label: 'Certificates',
    stat: (user) => user.certificateIds.length,
    icon: Medal,
  },
];

export function SubHeader({ session, lmsUser }: SubHeaderProps) {
  return (
    <div className="flex flex-row">
      <div className="mr-auto">
        <HeadingText userName={session.user.name} />
      </div>

      <div className="flex flex-row gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            number={stat.stat(lmsUser)}
            label={stat.label}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
