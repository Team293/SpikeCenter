import { config as reactInternalConfig } from '@spike/eslint-config/react-internal';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Package-level ignores first so they apply globally.
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

  // Package-specific override layer (extend/override here as needed)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Example (uncomment to enforce no default exports):
      // 'import/no-default-export': 'error',
    },
  },
];
