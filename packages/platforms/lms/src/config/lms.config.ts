import { z } from 'zod';

export const courseRoles = ['student', 'teacher', 'ta'] as const;
export type CourseRole = (typeof courseRoles)[number];

const lmsConfigSchema = z.object({
  courseRoles: z.array(z.string()).nonempty().readonly(),
});

const lmsConfigData = {
  courseRoles: courseRoles,
} as const satisfies z.infer<typeof lmsConfigSchema>;

export const lmsConfig = lmsConfigSchema.parse(lmsConfigData);
