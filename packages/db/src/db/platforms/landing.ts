import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const changelogEntry = pgTable('changelog_entry', {
  version: text('version').notNull(),
  date: timestamp('date').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  items: text('items').array().default([]),
  image: text('image'),
  buttonUrl: text('button_url'),
  buttonText: text('button_text'),
});

export const blogPost = pgTable('blog_post', {
  id: text('id').primaryKey().notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
});
