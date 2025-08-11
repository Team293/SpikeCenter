import serverEnv from '@spike/env/env.server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as authSchema from './db/auth';
import * as notificationsSchema from './db/features/notifications';
import * as landingSchema from './db/platforms/landing';
import * as lmsSchema from './db/platforms/lms';
import * as attendanceSchema from './db/platforms/attendance';

const pool = new Pool({
  connectionString: serverEnv.DATABASE_URL,
});

const fullSchema = {
  ...authSchema,
  ...notificationsSchema,
  ...lmsSchema,
  ...landingSchema,
  ...attendanceSchema,
};

export const db = drizzle({ client: pool, schema: fullSchema });

export { fullSchema as schema };
export * from './db/auth';
export * from './db/features/notifications';
export * from './db/platforms/lms';
export * from './db/platforms/landing';
export * from './db/platforms/attendance';
export { eq, lt, gte, ne, and, desc } from 'drizzle-orm';
