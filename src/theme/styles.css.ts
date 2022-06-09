import { createTheme } from "@vanilla-extract/css";
import { color, lightThemeVars, darkThemeVars } from "./color.css";

export const light = createTheme(color, lightThemeVars);
export const dark = createTheme(color, darkThemeVars);
