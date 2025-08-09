import z from 'zod';

const sharedEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_BASE_URL: z.string(),
  BASE_URL: z.string(),
});

const sharedEnv = sharedEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
} satisfies Record<keyof z.infer<typeof sharedEnvSchema>, unknown>);

export default sharedEnv;
