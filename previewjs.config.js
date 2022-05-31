/* eslint-env node */
module.exports = {
  wrapper: {
    path: "__previewjs__/Wrapper.tsx",
    componentName: "Wrapper",
  },
  vite: {
    css: {
      postcss: require("./postcss.config.cjs"),
    },
  },
};
