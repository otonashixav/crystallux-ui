import { style } from "@vanilla-extract/css";
import { color } from "../../theme/color.css";
import {
  elevatable,
  localElevation,
  totalElevation,
} from "../../theme/elevation.css";
import { rgba } from "../../theme/utils";

export const div = style([
  {
    backgroundColor: rgba(color.primary),
    border: `black solid calc(${totalElevation} * 1px)`,
    vars: {
      [localElevation]: "1",
    },
  },
  elevatable,
]);
