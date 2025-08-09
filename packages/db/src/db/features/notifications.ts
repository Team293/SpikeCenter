import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from '../auth';

export const notification = pgTable('notification', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  timestamp: timestamp('timestamp')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  isRead: boolean('is_read')
    .$default(() => false)
    .notNull(),
  notificationType: text('notification_type').notNull(),
  widgetId: text('widget_id'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  platformId: text('platform_id'),
  widgetData: jsonb('widget_data'),
});
