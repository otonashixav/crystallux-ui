import { createVar, fallbackVar, globalStyle } from "@vanilla-extract/css";
import { CSSVarFunction } from "@vanilla-extract/private";

export const isLtr = createVar();
export const isRtl = createVar();
globalStyle(":root, [dir=ltr]", {
  vars: { [isRtl]: "", [isLtr]: "initial" },
});
globalStyle("[dir=rtl]", {
  vars: { [isRtl]: "initial", [isLtr]: "" },
});

export const rtl = (value: string) => fallbackVar(isRtl, value);
export const ltr = (value: string) => fallbackVar(isLtr, value);
export const ltrRtl = <L extends string, R extends string>(
  ltrProperty: L,
  rtlProperty: R,
  value: string
) =>
  ({ [ltrProperty]: ltr(value), [rtlProperty]: rtl(value) } as Record<
    L | R,
    CSSVarFunction
  >);
