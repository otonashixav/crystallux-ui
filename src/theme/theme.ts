import { FlowProps, JSX } from "solid-js";

export type RGBA = [r: number, g: number, b: number, a: number];
export type Color =
  | "surface"
  | "surfaceVariant"
  | "surfaceInverse"
  | "primary"
  | "primaryInverse"
  | "secondary"
  | "tertiary"
  | "error"
  | "primaryContainer"
  | "secondaryContainer"
  | "tertiaryContainer"
  | "errorContainer"
  | [RGBA, RGBA];
export interface Theme extends JSX.CSSProperties {}
export interface ThemeOptions {}
export function ThemeProvider(props: FlowProps<{ theme: Theme }>) {}
export function createTheme(): Theme {}
