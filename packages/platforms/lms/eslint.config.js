import { nextJsConfig } from '@spike/eslint-config/next-js';

/**
 * Flat ESLint configuration for @spike/lms-platform.
 *
 * We reuse the shared Next.js + React + TypeScript flat config exported as `nextJsConfig`
 * to stay aligned with application packages, then layer on:
 *  - Package-specific ignore globs
 *  - A final override to ensure type-aware rules use the local tsconfig (`project: true`)
 *
 * If this package later needs a lighter set of rules (e.g. for purely non-React code),
 * we can introduce a slimmer shared config and switch to that here.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  // Package-level ignores first (these apply before shared configs)
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      '.next/**',
      'coverage/**',
      'build/**',
      'pnpm-lock.yaml',
    ],
  },

  // Shared Next.js + React + TS rules
  ...nextJsConfig,
];
