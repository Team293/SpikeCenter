import {
  and,
  course,
  eq,
  lmsEnrollment,
  lmsLesson,
  lmsLessonCompletion,
  lmsUser,
} from '@spike/db';
import { TRPCError } from '@trpc/server';
import z from 'zod';

import { protectedProcedure, router } from '../../trpc';

export const lmsRouter = router({
  getCoursesForUser: protectedProcedure
    .input(
      z.object({
        lmsUserId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { lmsUserId } = input;
      const { db, user } = ctx;

      const rows = await db
        .select({
          course,
          lmsEnrollment,
        })
        .from(lmsEnrollment)
        .innerJoin(course, eq(course.id, lmsEnrollment.courseId))
        .where(
          and(eq(lmsEnrollment.userId, lmsUserId), eq(course.isActive, true)),
        );

      return rows.map((row) => ({
        course: row.course,
        enrollment: row.lmsEnrollment,
      }));
    }),
});
