import { nextJsConfig } from '@spike/eslint-config/next-js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Package-level ignores
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.next/**',
      'pnpm-lock.yaml',
    ],
  },

  // Shared Next.js + React + TS configuration
  ...nextJsConfig,

  // Room for package-specific overrides
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Add or override package-specific rules here if needed.
      // Example: "react/jsx-no-leaked-render": "warn",
    },
  },
];
