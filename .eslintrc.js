/** @type {import("@types/eslint").Linter.Config} */
/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-types": ["error", { types: { "{}": false } }],
    "@typescript-eslint/no-empty-interface": "off",
  },
};
