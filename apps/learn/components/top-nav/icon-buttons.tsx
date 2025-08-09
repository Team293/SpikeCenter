'use client';

import { Button } from '@spike/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@spike/ui/tooltip';
import { Bell, Command, MessageSquareText } from 'lucide-react';

export default function IconButtons({
  messages = 0,
  notifications = 0,
}: {
  messages?: number;
  notifications?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <CommandButton />
      <MessagesButton messages={messages} />
      <NotificationsButton notifications={notifications} />
    </div>
  );
}

function CommandButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted relative h-9 w-9 rounded-full transition-colors"
            aria-label="Open command menu"
            onClick={() =>
              //todo open command menu
              {}
            }
          >
            <Command className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open command menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function MessagesButton({ messages }: { messages: number }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted h-9 w-9 rounded-full transition-colors"
            aria-label="Open messages"
            onClick={() =>
              //todo open messages
              {}
            }
          >
            <MessageSquareText className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open messages</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function NotificationsButton({ notifications }: { notifications: number }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted relative h-9 w-9 rounded-full transition-colors"
            aria-label="Open notifications"
            onClick={() =>
              //todo open notifications
              {}
            }
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                {notifications}
              </span>
            ) : null}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open notifications</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
