/**
 * Flat ESLint configuration for @spike/notifications.
 *
 * This package provides feature-level TypeScript/React code (no Next.js pages),
 * so we reuse the shared internal React + TS flat config and add:
 *  - Package-level ignore globs
 *  - A placeholder override for future rule customizations
 *
 * We intentionally avoid enabling full type-aware linting (no parserOptions.project)
 * to keep linting fast and to prevent TypeScript project lookup issues.
 */

import { config as reactInternalConfig } from '@spike/eslint-config/react-internal';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Global ignores specific to this package
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'pnpm-lock.yaml',
    ],
  },

  // Shared internal React + TypeScript configuration
  ...reactInternalConfig,

  // Package-specific adjustments (extend or override here)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Add notifications-specific rule changes here.
      // Example (uncomment to enforce no default exports):
      // 'import/no-default-export': 'error',
    },
  },
];
