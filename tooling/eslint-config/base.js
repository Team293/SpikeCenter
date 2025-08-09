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

export default config;

// Provide CommonJS export for ESLint v8 so that the exported object does not include a Babel-style
// { __esModule, default } wrapper object which causes "Unexpected top-level property \"__esModule\"".
// This uses a Function constructor so that referencing 'module' does not throw in native ESM.
const _m = (0, Function)("try { return module; } catch { return null; }")();
if (_m && _m.exports) {
  // If transpilation left a wrapper (exports.__esModule && exports.default), replace it with the plain object.
  if (
    _m.exports &&
    _m.exports.default &&
    typeof _m.exports.__esModule !== "undefined"
  ) {
    _m.exports = _m.exports.default;
  }
  // Ensure we export the raw config object.
  _m.exports = config;
}
