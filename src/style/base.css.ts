import {
  assignVars,
  createGlobalTheme,
  createThemeContract,
  globalStyle,
  style,
} from "@vanilla-extract/css";
import { tokens } from "./tokens.css";
import { omit, rgba } from "./utils";

export const m3Properties = createThemeContract({
  containerColor: null,
  containerOpacity: null,
  contentColor: null,
  contentOpacity: null,
  stateOverlayColor: null,
  stateOverlayOpacity: null,
  outlineWidth: null,
  outlineColor: null,
  outlineOpacity: null,
  elevationOverlayColor: null,
  elevationOverlayOpacity: null,
  elevationShadow: null,
});

createGlobalTheme(":root", m3Properties, {
  containerColor: tokens.color.background,
  containerOpacity: "1",
  contentColor: tokens.color.onBackground,
  contentOpacity: "1",
  stateOverlayColor: m3Properties.contentColor,
  stateOverlayOpacity: "0",
  outlineWidth: tokens.size.outline,
  outlineColor: "0 0 0",
  outlineOpacity: "0",
  elevationOverlayColor: tokens.color.surfaceTint,
  elevationOverlayOpacity: "0",
  elevationShadow: "0 0",
});

globalStyle("body", {
  backgroundColor: rgba(
    m3Properties.containerColor,
    m3Properties.containerOpacity
  ),
  color: rgba(m3Properties.contentColor, m3Properties.contentOpacity),
});

export const m3Container = style({
  vars: assignVars(omit(m3Properties, ["contentColor", "contentOpacity"]), {
    containerColor: "0 0 0",
    containerOpacity: "0",
    stateOverlayColor: m3Properties.contentColor,
    stateOverlayOpacity: "0",
    outlineWidth: "0",
    outlineColor: "0 0 0",
    outlineOpacity: "0",
    elevationOverlayColor: tokens.color.surfaceTint,
    elevationOverlayOpacity: "0",
    elevationShadow: "0 0",
  }),
  backgroundColor: rgba(
    m3Properties.containerColor,
    m3Properties.containerOpacity
  ),
  color: rgba(m3Properties.contentColor, m3Properties.contentOpacity),
  boxShadow: `inset 0 99999px ${rgba(
    m3Properties.stateOverlayColor,
    m3Properties.stateOverlayOpacity
  )}, inset 0 0 ${m3Properties.outlineWidth} ${rgba(
    m3Properties.outlineColor,
    m3Properties.outlineOpacity
  )}, inset 0 99999px ${rgba(
    m3Properties.elevationOverlayColor,
    m3Properties.elevationOverlayOpacity
  )}, ${m3Properties.elevationShadow}`,
});

export const interactableProperties = createThemeContract({
  hover: {},
  focus: {},
  pressed: {},
});
export const m3Interactable = style({
  "@supports": {
    "selector(:focus-visible)": {
      selectors: {
        "&:focus": {},
        "&:focus-visible": {},
      },
    },
  },
  selectors: {
    "body:not(body[data-no-hover]) &[data-hover]": {},

    "&:focus": {},

    "&[data-pressed]": {},
    "&[data-dragged]": {},
    "&:disabled": {},
  },
});
export const m3Elevated = style({});
