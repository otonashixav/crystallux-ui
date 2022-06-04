/* eslint-env node */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "solid"],
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:solid/typescript",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "solid/reactivity": "off",
  },
  env: {
    browser: true,
    es2019: true,
  },
};
