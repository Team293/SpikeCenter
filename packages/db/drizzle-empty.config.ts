import serverEnv from '@spike/env/env.server';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/db/empty/empty-schema.ts',
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});
