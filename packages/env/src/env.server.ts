import dotenvFlow from 'dotenv-flow';
import { findUpSync } from 'find-up';
import { dirname } from 'path';
import { z } from 'zod';


const envFilePath = findUpSync('.env');
if (!envFilePath) throw new Error('.env file not found');

const envDir = dirname(envFilePath);

delete process.env.DATABASE_URL; // cause this was found in my launchctl environment and it was causing issues with migrating

// Enable debug mode for dotenv-flow in development to help troubleshoot environment variable loading issues.
dotenvFlow.config({ path: envDir, debug: process.env.NODE_ENV === 'development' });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  BETTER_AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

const serverEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
} satisfies Record<keyof z.infer<typeof envSchema>, unknown>);

export default serverEnv;
