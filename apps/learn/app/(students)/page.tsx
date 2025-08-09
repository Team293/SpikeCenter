import { headers } from 'next/headers';

import { auth } from '@spike/auth';
import { lmsPlatformAnnouncement, lmsUser } from '@spike/db';

import { Announcement } from './_components/announcement/announcement';
import { SubHeader } from './_components/sub-header/sub-header';

const mockLmsUser: typeof lmsUser.$inferSelect = {
  id: 'mock-id',
  delegateUserId: 'mock-delegate-user-id',
  points: 100,
  certificateIds: ['cert1', 'cert2'],
};

const mockAnnouncement: typeof lmsPlatformAnnouncement.$inferSelect = {
  id: 'annoucement-id',
  title: 'Welcome to the LMS!',
  content:
    'We are excited to have you on board. Start your learning journey today!',
  variant: 'warning',
  badgeText: 'New',
  href: '/',
  isActive: true,
  createdOn: new Date(),
  expireDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    // we already have an auth check in the layout
    return null;
  }

  return (
    <div>
      <SubHeader session={session} lmsUser={mockLmsUser} />
      <Announcement announcement={mockAnnouncement} className="mt-10" />
    </div>
  );
}
