import { BetterAuthPlugin } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';

export const baseAvatarPlugin = () =>
  ({
    id: 'base-avatar',
    hooks: {
      before: [
        {
          matcher: (context) => context.path.startsWith('/sign-up'),
          handler: createAuthMiddleware(async (ctx) => {
            const initials = ctx.body.name
              .split(' ')
              .map((name: string) => name.charAt(0).toUpperCase())
              .join('');
            ctx.body.image = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=256`;
          }),
        },
      ],
    },
  }) satisfies BetterAuthPlugin;
