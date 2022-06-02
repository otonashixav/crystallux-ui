/** @type {import("stylelint").Config} */
module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
    "property-no-unknown": [true, { ignoreProperties: ["composes"] }],
    "declaration-block-no-duplicate-properties": [
      true,
      { ignoreProperties: ["composes"] },
    ],
  },
};
