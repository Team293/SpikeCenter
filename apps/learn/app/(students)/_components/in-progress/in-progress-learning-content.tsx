import { lmsUser } from '@spike/db';
import { trpcServerCall } from '@spike/next';

interface InProgressLearningContentProps {
  lmsUser: typeof lmsUser.$inferSelect;
}

export async function InProgressLearningContent({
  lmsUser,
}: InProgressLearningContentProps) {
  const coursesEnrolled = await trpcServerCall((trpc) =>
    trpc.lms.getCoursesForUser.query({
      lmsUserId: lmsUser.id,
      // roleFilter: 'student',
    }),
  );
}
