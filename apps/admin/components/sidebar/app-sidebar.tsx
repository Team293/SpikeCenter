'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@spike/ui/sidebar';
import {
  Bolt,
  BookOpen,
  Bot,
  ChartSpline,
  ClipboardList,
  Command,
  LayoutDashboard,
  LifeBuoy,
  Send,
  UserCog,
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Overview',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Scouter Management',
      url: '#',
      icon: UserCog,
      items: [
        {
          title: 'Scouters',
          url: '#',
        },
        {
          title: 'Avalibility',
          url: '#',
        },
        {
          title: 'Scouter Health',
          url: '#',
        },
      ],
    },
    {
      title: 'Assignments',
      url: '#',
      icon: ClipboardList,
      items: [
        {
          title: 'All Assignments',
          url: '#',
        },
        {
          title: 'Missing Assignments',
          url: '#',
        },
        {
          title: 'Schedule Editor',
          url: '#',
        },
      ],
    },
    {
      title: 'Data & Forms',
      url: '#',
      icon: ChartSpline,
      items: [
        {
          title: 'Data Viewer',
          url: '#',
        },
        {
          title: 'Form Editor',
          url: '#',
        },
        {
          title: 'Duplicate Entries',
          url: '#',
        },
        {
          title: 'Flagged Matches',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Bolt,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Scouters',
          url: '#',
        },
        {
          title: 'Access',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
