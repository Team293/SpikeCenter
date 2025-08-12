import z from 'zod';


const sharedEnvSchema = z.object({
  AUTH_BASE_URL: z.string(),
  API_BASE_URL: z.string(),
  DOCS_BASE_URL: z.string(),
  LANDING_BASE_URL: z.string(),
  LEARN_BASE_URL: z.string(),
  SCOUT_BASE_URL: z.string(),
  ATTENDANCE_BASE_URL: z.string(),
});

const sharedEnv = sharedEnvSchema.parse({
  AUTH_BASE_URL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  DOCS_BASE_URL: process.env.NEXT_PUBLIC_DOCS_BASE_URL,
  LANDING_BASE_URL: process.env.NEXT_PUBLIC_LANDING_BASE_URL,
  LEARN_BASE_URL: process.env.NEXT_PUBLIC_LEARN_BASE_URL,
  SCOUT_BASE_URL: process.env.NEXT_PUBLIC_SCOUT_BASE_URL,
  ATTENDANCE_BASE_URL: process.env.NEXT_PUBLIC_ATTENDANCE_BASE_URL,
} satisfies Record<keyof z.infer<typeof sharedEnvSchema>, unknown>);

export default sharedEnv;
