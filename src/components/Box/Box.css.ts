import { style } from "@vanilla-extract/css";
import { colorVars } from "src/theme/color/theme.css";
import { rgba } from "src/theme/color/utils";

export const div = style({
  backgroundColor: rgba(colorVars, "primary"),
});
