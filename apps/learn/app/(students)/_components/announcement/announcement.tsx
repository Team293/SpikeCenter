import Link from 'next/link';

import { lmsPlatformAnnouncement } from '@spike/db';
import { Alert, AlertDescription, AlertTitle } from '@spike/ui/alert';
import { Badge } from '@spike/ui/badge';
import { If } from '@spike/ui/if';
import { cn } from '@spike/ui/utils';
import { ChevronRight } from 'lucide-react';

interface AnnouncementProps {
  announcement: typeof lmsPlatformAnnouncement.$inferSelect;
  className?: string;
}

type AnnouncementVariant = typeof lmsPlatformAnnouncement.$inferSelect.variant;

const variantBgStyles: Record<AnnouncementVariant, string> = {
  info: 'bg-blue-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  success: 'bg-green-100',
};

const variantBadgeStyles: Record<AnnouncementVariant, string> = {
  info: 'bg-blue-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600',
  success: 'bg-green-600',
};

export function Announcement({ announcement, className }: AnnouncementProps) {
  const getHrefStyle = () => {
    if (announcement.href) {
      return 'cursor-pointer hover:transform hover:scale-101 transition-transform duration-200';
    }

    return '';
  };
  const alertContent = (
    <Alert
      variant={'default'}
      className={cn(
        variantBgStyles[announcement.variant],
        className,
        getHrefStyle(),
        'border-none',
        announcement.href ? 'relative' : '',
      )}
    >
      <AlertTitle className="flex items-center gap-2 text-xl font-bold">
        <If condition={announcement.badgeText}>
          <Badge
            variant={'default'}
            className={cn(
              variantBadgeStyles[announcement.variant],
              'px-2 py-1',
            )}
          >
            {announcement.badgeText}
          </Badge>
        </If>

        {announcement.title}
      </AlertTitle>
      <AlertDescription className="mt-2 font-medium text-black">
        {announcement.content}
      </AlertDescription>

      <If condition={announcement.href}>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 transform">
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>
      </If>
    </Alert>
  );

  if (announcement.href) {
    return <Link href={announcement.href}>{alertContent}</Link>;
  }

  return alertContent;
}
