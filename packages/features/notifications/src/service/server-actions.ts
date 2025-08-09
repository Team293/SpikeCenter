import { and, db, eq, notification } from '@spike/db';

export async function getNotificationsAction({
  userId,
  platformId,
}: {
  userId: string;
  platformId: string;
}) {
  return await db
    .select()
    .from(notification)
    .where(
      and(
        eq(notification.platformId, platformId),
        eq(notification.userId, userId),
      ),
    );
}

export async function sendNotificationAction({
  userId,
  title,
  description,
  platformId,
  notificationType,
  widgetId,
  widgetData,
}: {
  userId: string;
  title: string;
  description: string;
  platformId: string;
  notificationType: string;
  widgetId?: string;
  widgetData?: Record<string, any>;
}) {
  const newNotification = {
    id: crypto.randomUUID(),
    title,
    description,
    timestamp: new Date(),
    isRead: false,
    notificationType,
    widgetId,
    userId,
    platformId,
    widgetData,
  };

  await db.insert(notification).values(newNotification);
}
