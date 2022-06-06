import { Accessor } from "solid-js";
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

export function useTheme(options: {
  elevation?: Accessor<number>;
  applyElevation?: boolean;
}) {}
