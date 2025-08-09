'use client';

import { authClient } from '@spike/auth/client';
import { Button } from '@spike/ui/button';
import { Input } from '@spike/ui/input';
import { cn } from '@spike/ui/utils';
import { GalleryVerticalEnd, Github, Mail } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { getLoginService } from './_lib/login.service';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [redirectUrl, setRedirectUrl] = useQueryState('/');

  const getRedirectUrl = () => {
    return 'http://localhost:3001' + (redirectUrl || '/');
  };

  const onMagicLinkSubmit = async (email: string) => {
    const loginService = getLoginService();
    await loginService.loginWithMagicLink(email, getRedirectUrl());
  };

  const onGithubLogin = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: getRedirectUrl(),
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={(e) => onMagicLinkSubmit(e.currentTarget.email.value)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Spike Suite</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Spike Suite</h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Input
                id="email"
                type="email"
                placeholder="john.doe@293spike.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {<Mail />}
              Continue with Magic Link
            </Button>
          </div>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() => onGithubLogin()}
          >
            <Github />
            Continue with GitHub
          </Button>
        </div>
      </form>

      <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
