import sharedEnv from '@spike/env/env.shared';
import z from 'zod';

const PathSchema = z.object({
  href: z.string(),
  replacements: z.array(z.string()).optional(),
});

const DashboardPathsSchema = z.object({
  overview: PathSchema,
  plugins: PathSchema,
  macros: PathSchema,
  members: PathSchema,
  settings: PathSchema,
  projectOverview: PathSchema,
  projectInstallFlow: PathSchema,
  projectLogs: PathSchema,
  projectAnalytics: PathSchema,
  projectSettings: PathSchema,
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
    subdomain: z.string().optional(),
    paths: pathsSchema,
  });

const PathsSchema = z.object({
  dashboard: AppPathSchema(DashboardPathsSchema),
  auth: AppPathSchema(AuthPathsSchema),
  landing: AppPathSchema(LandingPathsSchema),
});

const pathsConfigData = {
  dashboard: {
    subdomain: 'dashboard',
    paths: {
      overview: { href: '/overview' },
      plugins: { href: '/plugins' },
      macros: { href: '/macros' },
      members: { href: '/members' },
      settings: { href: '/settings' },
      projectOverview: {
        href: '/projects/[project]',
        replacements: ['project'],
      },
      projectInstallFlow: {
        href: '/projects/[project]/install',
        replacements: ['project'],
      },
      projectLogs: {
        href: '/projects/[project]/logs',
        replacements: ['project'],
      },
      projectAnalytics: {
        href: '/projects/[project]/analytics',
        replacements: ['project'],
      },
      projectSettings: {
        href: '/projects/[project]/settings',
        replacements: ['project'],
      },
    },
  },
  auth: {
    subdomain: 'auth',
    paths: {
      login: { href: '/login' },
      account: { href: '/account' },
    },
  },
  landing: {
    paths: {
      root: { href: '/' },
    },
  },
} as const satisfies z.infer<typeof PathsSchema>;

export const pathsConfig = PathsSchema.parse(pathsConfigData);

type PathKeys = {
  dashboard: keyof typeof pathsConfigData.dashboard.paths;
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
  const subdomain = 'subdomain' in app ? app.subdomain : undefined;
  const basePath = subdomain
    ? `https://${subdomain}.${sharedEnv.BASE_URL}`
    : `https://${sharedEnv.BASE_URL}`;

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

  return `${basePath}${finalHref}`;
}
