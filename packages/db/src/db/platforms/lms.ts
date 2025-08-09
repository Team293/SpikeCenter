import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { user } from '../auth';

export const lmsUser = pgTable(
  'lms_user',
  {
    id: text('id').primaryKey(),
    delegateUserId: text('delegate_user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    points: integer('points').default(0).notNull(),
    certificateIds: jsonb('certificateIds')
      .$type<string[]>()
      .default([])
      .notNull(),
  },
  (table) => {
    return {
      delegateIdx: index('lms_user_delegate_user_id_idx').on(
        table.delegateUserId,
      ),
    };
  },
);

export const certificate = pgTable('lms_certificate', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => lmsUser.id, { onDelete: 'cascade' }),
  recievedOn: timestamp('recieved_on', { withTimezone: true }).defaultNow(),
  courseId: text('course_id')
    .notNull()
    .references(() => course.id, { onDelete: 'cascade' }),
});

export const course = pgTable('lms_course', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  isActive: boolean('is_active').default(true).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  organizationId: text('organization_id').notNull(),
  shortDescription: text('short_description').notNull(),
  longDescription: text('long_description').notNull(),
  createdOn: timestamp('created_on', { withTimezone: true }).defaultNow(),
  updatedOn: timestamp('updated_on', { withTimezone: true }).defaultNow(),
});

export const lmsPlatformAnnouncement = pgTable('lms_platform_announcement', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  variant: text('variant', {
    enum: ['info', 'warning', 'error', 'success'],
  }).notNull(),
  href: text('href'),
  badgeText: text('badge_text'),
  isActive: boolean('is_active').default(true).notNull(),
  createdOn: timestamp('created_on', { withTimezone: true }).defaultNow(),
  expireDate: timestamp('expire_date', { withTimezone: true }).notNull(),
});

export const lmsEnrollment = pgTable(
  'lms_enrollment',
  {
    userId: text('user_id')
      .notNull()
      .references(() => lmsUser.id, { onDelete: 'cascade' }),
    courseId: text('course_id')
      .notNull()
      .references(() => course.id, { onDelete: 'cascade' }),
    role: text('role', { enum: ['student', 'instructor', 'ta', 'owner'] })
      .notNull()
      .default('student'),
    enrolledOn: timestamp('enrolled_on', { withTimezone: true }).defaultNow(),
    deadline: timestamp('deadline', { withTimezone: true }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.courseId],
        name: 'lms_enrollment_pk',
      }),
      userIdx: index('lms_enrollment_user_idx').on(table.userId),
      courseIdx: index('lms_enrollment_course_idx').on(table.courseId),
    };
  },
);

export const lmsLesson = pgTable('lms_lesson', {
  id: text('id').primaryKey(),
  courseId: text('course_id')
    .notNull()
    .references(() => course.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  orderIndex: integer('order_index').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdOn: timestamp('created_on', { withTimezone: true }).defaultNow(),
  updatedOn: timestamp('updated_on', { withTimezone: true }).defaultNow(),
});

export const lmsLessonCompletion = pgTable(
  'lms_lesson_completion',
  {
    userId: text('user_id')
      .notNull()
      .references(() => lmsUser.id, { onDelete: 'cascade' }),
    lessonId: text('lesson_id')
      .notNull()
      .references(() => lmsLesson.id, { onDelete: 'cascade' }),
    completedOn: timestamp('completed_on', { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.lessonId],
        name: 'lms_lesson_completion_pk',
      }),
      userIdx: index('lms_lesson_completion_user_idx').on(table.userId),
      lessonIdx: index('lms_lesson_completion_lesson_idx').on(table.lessonId),
    };
  },
);
