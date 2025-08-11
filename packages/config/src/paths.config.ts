import sharedEnv from '@spike/env/env.shared';
import z from 'zod';

const PathSchema = z.object({
  href: z.string(),
  replacements: z.array(z.string()).optional(),
});

const AuthPathsSchema = z.object({
  login: PathSchema,
  account: PathSchema,
});

const LandingPathsSchema = z.object({
  root: PathSchema,
});

const AppPathSchema = <T extends z.ZodRawShape>(pathsSchema: z.ZodObject<T>) =>
  z.object({
    appUrl: z.string(),
    paths: pathsSchema,
  });

const PathsSchema = z.object({
  auth: AppPathSchema(AuthPathsSchema),
  landing: AppPathSchema(LandingPathsSchema),
});

const pathsConfigData = {
  auth: {
    appUrl: sharedEnv.AUTH_BASE_URL,
    paths: {
      login: { href: '/login' },
      account: { href: '/account' },
    },
  },
  landing: {
    appUrl: sharedEnv.LANDING_BASE_URL,
    paths: {
      root: { href: '/' },
    },
  },
} as const satisfies z.infer<typeof PathsSchema>;

export const pathsConfig = PathsSchema.parse(pathsConfigData);

type PathKeys = {
  auth: keyof typeof pathsConfigData.auth.paths;
  landing: keyof typeof pathsConfigData.landing.paths;
};

type ExtractReplacements<
  TApp extends keyof typeof pathsConfigData,
  TPath extends PathKeys[TApp],
> = TPath extends keyof (typeof pathsConfigData)[TApp]['paths']
  ? (typeof pathsConfigData)[TApp]['paths'][TPath] extends {
      replacements: readonly (infer R)[];
    }
    ? R extends string
      ? Record<R, string>
      : never
    : never
  : never;

type HasReplacements<
  TApp extends keyof typeof pathsConfigData,
  TPath extends PathKeys[TApp],
> = TPath extends keyof (typeof pathsConfigData)[TApp]['paths']
  ? (typeof pathsConfigData)[TApp]['paths'][TPath] extends {
      replacements: readonly string[];
    }
    ? true
    : false
  : false;

export function asUrl<
  TApp extends keyof typeof pathsConfigData,
  TPath extends PathKeys[TApp],
>(
  appKey: TApp,
  pathKey: TPath,
  ...args: HasReplacements<TApp, TPath> extends true
    ? [replacements: ExtractReplacements<TApp, TPath>]
    : [replacements?: never]
): string;

export function asUrl<TApp extends keyof typeof pathsConfigData>(
  appKey: TApp,
  pathKey: PathKeys[TApp],
  replacements?: Record<string, string>,
): string {
  const app = pathsConfigData[appKey];
  const appUrl = 'appUrl' in app ? app.appUrl : undefined;

  if (!appUrl) {
    throw new Error(
      `App URL is not defined for app: ${appKey}. Please check your paths configuration.`,
    );
  }

  const pathValue = app.paths[pathKey as keyof typeof app.paths] as {
    href: string;
    replacements?: string[];
  };

  let finalHref = pathValue.href;

  if (pathValue.replacements && replacements) {
    for (const replacement of pathValue.replacements) {
      const value = replacements[replacement];
      if (value !== undefined) {
        finalHref = finalHref.replace(`[${replacement}]`, value);
      } else {
        console.warn(`Missing replacement value for: ${replacement}`);
      }
    }
  }

  return `${appUrl}${finalHref}`;
}
