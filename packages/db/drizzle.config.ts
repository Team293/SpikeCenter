import serverEnv from '@spike/env/env.server';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/db/auth.ts',
    './src/db/features/notifications.ts',
    './src/db/platforms/lms.ts',
    './src/db/platforms/scout.ts',
    './src/db/platforms/landing.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});
