import { style } from "@vanilla-extract/css";
import { combinedColor } from "../../theme/color.css";
import {
  elevatable,
  localElevation,
  totalElevation,
} from "../../theme/elevation.css";
import { rtl } from "../../theme/selectorVars.css";

export const div = style([
  {
    backgroundColor: combinedColor.primary,
    border: `black solid calc(${totalElevation} * 1px)`,
    vars: {
      [localElevation]: rtl("1"),
    },
  },
  elevatable,
]);
