/* eslint-env node */
module.exports = {
  rootDirPath: ".",
  wrapper: {
    path: "__previewjs__/Wrapper.tsx",
    componentName: "Wrapper",
  },
  vite: {
    css: {
      modules: {
        root: ".",
      },
    },
  },
};
