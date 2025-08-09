import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";

/**
 * Flat ESLint configuration for Next.js packages (no legacy extends).
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const nextJsConfig = [
  // Base JS recommended
  js.configs.recommended,
  // TS recommended (flat)
  ...tseslint.configs.recommended,
  // React recommended (flat)
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["**/node_modules/**", "dist/**", ".next/**", "pnpm-lock.yaml"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      // Removed parserOptions.project to avoid requiring a TypeScript project for every consumer
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@next/next": pluginNext,
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      // Next.js
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      // React hooks
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      // Base repo TS rule customizations
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-i18next",
              importNames: ["Trans"],
              message: "Please use `@spike/ui/trans` instead",
            },
          ],
        },
      ],
    },
  },
  // Prettier last
  eslintConfigPrettier,
];
