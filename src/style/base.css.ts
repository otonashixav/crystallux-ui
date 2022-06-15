import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { m3 } from "./tokens.css";
import { rgba } from "./utils";

function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const res = {} as Pick<T, K>;
  for (const key of keys) res[key] = obj[key];
  return res;
}

function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const res = { ...obj };
  for (const key of keys) delete res[key];
  return res;
}

function mapObject<T extends Record<string, unknown>, U>(
  obj: T,
  map: (...args: { [K in keyof T]: [value: T[K], key: K] }[keyof T]) => U
): Record<keyof T, U> {
  const res = {} as Record<keyof T, U>;
  for (const key in obj) {
    res[key] = map(obj[key], key);
  }
  return res;
}

export const outlineSize = createVar();
export const outlineColor = createVar();
export const surfaceTintColor = createVar();
export const surfaceTintOpacity = createVar();
export const stateOpacity = createVar();
export const onColor = createVar();

export const container = styleVariants(m3.color, (value) => ({
  vars: { backgroundColor: value },
}));

export const onBase = style({ color: onColor });
export const on = styleVariants(m3.color, (value) => [
  onBase,
  { vars: { [onColor]: value } },
]);

export const baseOverlay = style({
  position: "relative",
  "::before": {
    content: '""',
    borderRadius: "inherit",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
export const baseStateOverlay = style([
  baseOverlay,
  {
    "::before": {
      backgroundColor: rgba(onColor, fallbackVar(stateOpacity, "0")),
    },
  },
]);
export const baseOutline = style([
  baseOverlay,
  {
    "::before": {
      borderColor: outlineColor,
      borderStyle: "solid",
      borderWidth: outlineSize,
    },
  },
]);
export const baseElevationOverlay = style([
  baseOverlay,
  {
    "::before": {
      boxShadow: `inset 0 100vh ${rgba(
        surfaceTintColor,
        fallbackVar(surfaceTintOpacity, "0")
      )}`,
    },
  },
]);
export const baseElevationShadow = style({
  boxShadow: ``,
});
