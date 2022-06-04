/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv({ stage: 1 })],
};
