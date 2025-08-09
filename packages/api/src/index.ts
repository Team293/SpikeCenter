import { landingRouter } from './routers/platforms/landing.router';
import { lmsRouter } from './routers/platforms/lms.router';
import { router } from './trpc';

export const _appRouter = router({
  lms: lmsRouter,
  landing: landingRouter,
});

export type AppRouter = typeof _appRouter;
