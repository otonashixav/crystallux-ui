import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { createSprinkles } from "@vanilla-extract/sprinkles";

export const shape = createThemeContract({
  corner: {
    none: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    xs: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    sm: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    md: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    lg: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    xl: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
    full: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: null,
    },
  },
});
createGlobalTheme(":root", shape, {
  size: {
    none: "0rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.75rem",
    full: "9999rem",
  },
});

createSprinkles();
