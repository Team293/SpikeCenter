import dotenvFlow from 'dotenv-flow';
import { findUpSync } from 'find-up';
import { dirname } from 'path';
import { z } from 'zod';

const envFilePath = findUpSync('.env');
if (!envFilePath) throw new Error('.env file not found');

const envDir = dirname(envFilePath);

delete process.env.DATABASE_URL; // cause this was found in my launchctl environment and it was causing issues with migrating

dotenvFlow.config({ path: envDir, debug: true });

const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  DATABASE_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

const serverEnv = envSchema.parse({
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
} satisfies Record<keyof z.infer<typeof envSchema>, unknown>);

export default serverEnv;
