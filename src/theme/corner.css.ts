import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { CSSVarFunction } from "@vanilla-extract/private";
import { defineProperties } from "@vanilla-extract/sprinkles";
import { ltrRtl } from "./selectorVars.css";

const defineCustomProperties = defineProperties as <
  P extends object,
  S extends Record<string, (keyof P)[]>
>(options: {
  properties: P;
  shorthands: S;
}) => {
  styles: { [K in keyof S]: { mappings: S[K] } } & {
    [K in keyof P]: {
      values: {
        [_ in P[K] extends readonly PropertyKey[]
          ? P[K][number]
          : keyof P[K]]: { defaultClass: string };
      };
    };
  };
};
type Corners<T> = Record<
  "topStart" | "topEnd" | "bottomEnd" | "bottomStart",
  T
>;
function asRadii(): Corners<null>;
function asRadii(radius: string): Corners<string>;
function asRadii(radius?: undefined | string): Corners<null> | Corners<string> {
  if (!radius)
    return { topStart: null, topEnd: null, bottomEnd: null, bottomStart: null };
  return {
    topStart: radius,
    topEnd: radius,
    bottomEnd: radius,
    bottomStart: radius,
  };
}

export const corner = createThemeContract({
  none: asRadii(),
  xs: asRadii(),
  sm: asRadii(),
  md: asRadii(),
  lg: asRadii(),
  xl: asRadii(),
  full: asRadii(),
});
createGlobalTheme(":root", corner, {
  none: asRadii("0px"),
  xs: asRadii("4px"),
  sm: asRadii("8px"),
  md: asRadii("12px"),
  lg: asRadii("16px"),
  xl: asRadii("28px"),
  full: asRadii("9999px"),
});

function makeCornerVariants(
  vertical: "top" | "bottom",
  horizontal: "start" | "end"
) {
  const Vertical = vertical[0].toUpperCase() + vertical.slice(1);
  const Horizontal = horizontal === "start" ? "Start" : "End";
  const LtrHorizontal = horizontal === "start" ? "Left" : "Right";
  const RtlHorizontal = horizontal === "end" ? "Left" : "Right";
  type Corners = typeof corner;
  return Object.fromEntries(
    Object.entries(corner).map(([size, radii]) => [
      size,
      ltrRtl(
        `border${Vertical}${LtrHorizontal}Radius`,
        `border${Vertical}${RtlHorizontal}Radius`,
        radii[`${vertical}${Horizontal}`]
      ),
    ])
  ) as {
    [K in keyof Corners]:
      | Record<
          `borderTop${typeof LtrHorizontal | typeof RtlHorizontal}Radius`,
          CSSVarFunction
        >
      | Record<
          `borderBottom${typeof LtrHorizontal | typeof RtlHorizontal}Radius`,
          CSSVarFunction
        >;
  };
}

export const cornerProperties = defineCustomProperties({
  shorthands: {
    corner: [
      "cornerTopStart",
      "cornerTopEnd",
      "cornerBottomEnd",
      "cornerBottomStart",
    ],
    cornerTop: ["cornerTopStart", "cornerTopEnd"],
    cornerEnd: ["cornerTopEnd", "cornerBottomEnd"],
    cornerBottom: ["cornerBottomEnd", "cornerBottomStart"],
    cornerStart: ["cornerTopStart", "cornerBottomStart"],
  },
  properties: {
    cornerTopStart: makeCornerVariants("top", "start"),
    cornerTopEnd: makeCornerVariants("top", "end"),
    cornerBottomEnd: makeCornerVariants("bottom", "end"),
    cornerBottomStart: makeCornerVariants("bottom", "start"),
  },
});
