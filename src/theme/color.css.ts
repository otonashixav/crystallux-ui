import {
  assignVars,
  createGlobalTheme,
  createTheme,
  createThemeContract,
  globalStyle,
} from "@vanilla-extract/css";
import { defineProperties } from "@vanilla-extract/sprinkles";
import { asRGBA, rgba } from "./utils";

export const color = createThemeContract({
  primary: asRGBA(),
  primaryContainer: asRGBA(),
  secondary: asRGBA(),
  secondaryContainer: asRGBA(),
  tertiary: asRGBA(),
  tertiaryContainer: asRGBA(),
  surface: asRGBA(),
  surfaceVariant: asRGBA(),
  background: asRGBA(),
  error: asRGBA(),
  errorContainer: asRGBA(),
  onPrimary: asRGBA(),
  onPrimaryContainer: asRGBA(),
  onSecondary: asRGBA(),
  onSecondaryContainer: asRGBA(),
  onTertiary: asRGBA(),
  onTertiaryContainer: asRGBA(),
  onSurface: asRGBA(),
  onSurfaceVariant: asRGBA(),
  onError: asRGBA(),
  onErrorContainer: asRGBA(),
  onBackground: asRGBA(),
  outline: asRGBA(),
  inverseSurface: asRGBA(),
  inverseOnSurface: asRGBA(),
  inversePrimary: asRGBA(),
});

export const colorTheme = createThemeContract({
  light: {
    primary: asRGBA(),
    primaryContainer: asRGBA(),
    secondary: asRGBA(),
    secondaryContainer: asRGBA(),
    tertiary: asRGBA(),
    tertiaryContainer: asRGBA(),
    surface: asRGBA(),
    surfaceVariant: asRGBA(),
    background: asRGBA(),
    error: asRGBA(),
    errorContainer: asRGBA(),
    onPrimary: asRGBA(),
    onPrimaryContainer: asRGBA(),
    onSecondary: asRGBA(),
    onSecondaryContainer: asRGBA(),
    onTertiary: asRGBA(),
    onTertiaryContainer: asRGBA(),
    onSurface: asRGBA(),
    onSurfaceVariant: asRGBA(),
    onError: asRGBA(),
    onErrorContainer: asRGBA(),
    onBackground: asRGBA(),
    outline: asRGBA(),
    inverseSurface: asRGBA(),
    inverseOnSurface: asRGBA(),
    inversePrimary: asRGBA(),
  },
  dark: {
    primary: asRGBA(),
    primaryContainer: asRGBA(),
    secondary: asRGBA(),
    secondaryContainer: asRGBA(),
    tertiary: asRGBA(),
    tertiaryContainer: asRGBA(),
    surface: asRGBA(),
    surfaceVariant: asRGBA(),
    background: asRGBA(),
    error: asRGBA(),
    errorContainer: asRGBA(),
    onPrimary: asRGBA(),
    onPrimaryContainer: asRGBA(),
    onSecondary: asRGBA(),
    onSecondaryContainer: asRGBA(),
    onTertiary: asRGBA(),
    onTertiaryContainer: asRGBA(),
    onSurface: asRGBA(),
    onSurfaceVariant: asRGBA(),
    onError: asRGBA(),
    onErrorContainer: asRGBA(),
    onBackground: asRGBA(),
    outline: asRGBA(),
    inverseSurface: asRGBA(),
    inverseOnSurface: asRGBA(),
    inversePrimary: asRGBA(),
  },
});

createGlobalTheme(":root", colorTheme.light, {
  primary: asRGBA("#6750A4"),
  primaryContainer: asRGBA("#EADDFF"),
  secondary: asRGBA("#625B71"),
  secondaryContainer: asRGBA("#E8DEF8"),
  tertiary: asRGBA("#7D5260"),
  tertiaryContainer: asRGBA("#FFD8E4"),
  surface: asRGBA("#FFFBFE"),
  surfaceVariant: asRGBA("#E7E0EC"),
  background: asRGBA("#FFFBFE"),
  error: asRGBA("#B3261E"),
  errorContainer: asRGBA("#F9DEDC"),
  onPrimary: asRGBA("#FFFFFF"),
  onPrimaryContainer: asRGBA("#21005E"),
  onSecondary: asRGBA("#FFFFFF"),
  onSecondaryContainer: asRGBA("#1E192B"),
  onTertiary: asRGBA("#FFFFFF"),
  onTertiaryContainer: asRGBA("#370B1E"),
  onSurface: asRGBA("#1C1B1F"),
  onSurfaceVariant: asRGBA("#49454E"),
  onError: asRGBA("#FFFFFF"),
  onErrorContainer: asRGBA("#370B1E"),
  onBackground: asRGBA("#1C1B1F"),
  outline: asRGBA("#79747E"),
  inverseSurface: asRGBA("#313033"),
  inverseOnSurface: asRGBA("#F4EFF4"),
  inversePrimary: asRGBA("#D0BCFF"),
});

createGlobalTheme(":root", colorTheme.dark, {
  primary: asRGBA("#D0BCFF"),
  primaryContainer: asRGBA("#4F378B"),
  secondary: asRGBA("#CCC2DC"),
  secondaryContainer: asRGBA("#4A4458"),
  tertiary: asRGBA("#EFB8C8"),
  tertiaryContainer: asRGBA("#633B48"),
  surface: asRGBA("#1C1B1F"),
  surfaceVariant: asRGBA("#49454F"),
  background: asRGBA("#1C1B1F"),
  error: asRGBA("#F2B8B5"),
  errorContainer: asRGBA("#8C1D18"),
  onPrimary: asRGBA("#371E73"),
  onPrimaryContainer: asRGBA("#EADDFF"),
  onSecondary: asRGBA("#332D41"),
  onSecondaryContainer: asRGBA("#E8DEF8"),
  onTertiary: asRGBA("#492532"),
  onTertiaryContainer: asRGBA("#FFD8E4"),
  onSurface: asRGBA("#E6E1E5"),
  onSurfaceVariant: asRGBA("#CAC4D0"),
  onError: asRGBA("#601410"),
  onErrorContainer: asRGBA("#F9DEDC"),
  onBackground: asRGBA("#E6E1E5"),
  outline: asRGBA("#938F99"),
  inverseSurface: asRGBA("#E6E1E5"),
  inverseOnSurface: asRGBA("#313033"),
  inversePrimary: asRGBA("#6750A4"),
});

export const light = createTheme(color, colorTheme.light);
export const dark = createTheme(color, colorTheme.dark);

globalStyle(":root", {
  vars: assignVars(color, colorTheme.light),
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: assignVars(color, colorTheme.dark),
    },
  },
});

export const combinedColor = createGlobalTheme(
  "*",
  Object.fromEntries(
    Object.entries(color).map(([name, parts]) => [name, rgba(parts)])
  ) as { [K in keyof typeof color]: string }
);

export const colorProperties = defineProperties({
  properties: {
    backgroundColor: combinedColor,
    color: combinedColor,
    borderColor: combinedColor,
  },
});
