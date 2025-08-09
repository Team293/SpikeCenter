/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "plugin:turbo/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/only-throw-error": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
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
  ignorePatterns: [
    "**/.eslintrc.cjs",
    "**/*.config.cjs",
    "**/node_modules",
    "database.types.ts",
    ".next",
    "dist",
    "pnpm-lock.yaml",
  ],
  reportUnusedDisableDirectives: true,
};

// Export plain object (no default wrapper) for ESLint v8 CommonJS resolution.
module.exports = config;
