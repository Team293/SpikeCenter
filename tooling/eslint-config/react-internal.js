import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

/**
 * Flat ESLint configuration for internal React packages.
 * Does not rely on legacy .eslintrc-style "extends" to avoid migration issues.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const config = [
  // Base JS recommended rules
  js.configs.recommended,
  // TypeScript ESLint flat recommended configs (array)
  ...tseslint.configs.recommended,
  // React recommended (flat) config
  pluginReact.configs.flat.recommended,
  // Project specific adjustments
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["**/node_modules/**", "dist/**", ".next/**", "pnpm-lock.yaml"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      // Mirror important rules from base legacy config (relaxed for broader repo compatibility)
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-misused-promises": "off",
      // Keep disabled rules aligned with legacy intent
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
  // Prettier last to disable stylistic rules that conflict with formatting
  eslintConfigPrettier,
];
