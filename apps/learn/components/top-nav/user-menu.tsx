'use client';

import { Avatar, AvatarFallback } from '@spike/ui/avatar';
import { Button } from '@spike/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@spike/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type User = { name: string; role: string; initials: string };

export default function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-muted data-[state=open]:bg-muted h-10 rounded-full pr-2 pl-1 transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sky-500 text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="mr-1 ml-2 hidden flex-col items-start text-left sm:flex">
            <span className="text-sm leading-none">{user.name}</span>
            <span className="text-muted-foreground mt-0.5 text-[11px] leading-none">
              {user.role}
            </span>
          </div>
          <ChevronDown className="text-muted-foreground ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={
              () => {} //todo open profile
            }
          >
            {'Profile'}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={
              () => {}
              // todo: open settings
            }
          >
            {'Settings'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-600 focus:text-rose-600"
          onClick={() =>
            //todo sign out
            {}
          }
        >
          {'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
