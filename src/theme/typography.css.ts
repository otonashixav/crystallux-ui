import { createThemeContract } from "@vanilla-extract/css";

const allSizesFontProperties = () => ({
  large: null,
  medium: null,
  small: null,
});

export const typography = createThemeContract({
  display: allSizesFontProperties(),
  headline: allSizesFontProperties(),
  title: allSizesFontProperties(),
  label: allSizesFontProperties(),
  body: allSizesFontProperties(),
});
