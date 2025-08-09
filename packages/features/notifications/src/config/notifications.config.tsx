import { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export interface NotificationType {
  id: string;
  icon: LucideIcon;
  background: string;
}

export interface NotificationWidget<T = any> {
  id: string;
  input: z.ZodSchema<T>;
  render: (props: T) => React.ReactNode;
}

export function createNotificationWidget<T>({
  id,
  input,
  render,
}: {
  id: string;
  input: z.ZodSchema<T>;
  render: (props: T) => React.ReactNode;
}): NotificationWidget<T> {
  return {
    id,
    input,
    render,
  };
}

export interface Notification<T = NotificationType, W = NotificationWidget> {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  notificationType: T;
  widget?: W;
}
