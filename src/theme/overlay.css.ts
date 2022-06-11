import { createThemeContract, createVar, style } from "@vanilla-extract/css";
import { asRGBA, rgba } from "./utils";

export const overlay = createThemeContract({
  elevation: asRGBA(),
  state: asRGBA(),
});

const overlayA = createVar();
function overlayPart(part: "R" | "G" | "B"): string {
  return `calc(${overlay.elevation[part]} + ${overlay.state[part]} - ${overlay.elevation[part]} * ${overlayA})`;
}
export const enableOverlay = style({
  "::before": {
    vars: {
      [overlayA]: `calc(${overlay.elevation.A} + ${overlay.state.A} - ${overlay.elevation.A} * ${overlay.state.A})`,
    },
    backgroundColor: rgba({
      R: overlayPart("R"),
      G: overlayPart("G"),
      B: overlayPart("B"),
      A: overlayA,
    }),
  },
});
