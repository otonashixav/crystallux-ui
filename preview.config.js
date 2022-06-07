/* eslint-env node */
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { vanillaExtractPlugin } = require("@vanilla-extract/vite-plugin");
module.exports = {
  wrapper: {
    path: "__previewjs__/Wrapper.tsx",
    componentName: "Wrapper",
  },
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
};
