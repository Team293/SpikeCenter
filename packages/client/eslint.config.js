/**
 * Flat ESLint configuration for @spike/client.
 *
 * This package exposes React + TypeScript client utilities (no Next.js
 * app/pages here), so we reuse the shared internal React + TS flat config
 * (`react-internal`) and layer on:
 *   - Package-level ignore globs
 *   - A light override block for future, package‑specific rules
 *
 * We intentionally DO NOT enable full type-aware linting (no parserOptions.project),
 * keeping lint fast and avoiding cross‑package TS project resolution issues.
 */

const { config: reactInternalConfig } = require('@spike/eslint-config/react-internal');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Package-level ignores
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'pnpm-lock.yaml',
    ],
  },

  // Shared internal React + TypeScript rules
  ...reactInternalConfig,

  // Client-specific overrides / placeholders
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Add or override client-level rules here, e.g.:
      // 'import/no-default-export': 'error',
    },
  },
];
