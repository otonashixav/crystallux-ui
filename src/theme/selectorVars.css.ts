import { createVar, fallbackVar, globalStyle } from "@vanilla-extract/css";

export const isLtr = createVar();
export const isRtl = createVar();
globalStyle(":root, [dir=ltr]", {
  vars: { [isRtl]: "", [isLtr]: "initial" },
});
globalStyle("[dir=rtl]", {
  vars: { [isRtl]: "initial", [isLtr]: "" },
});

export const ltr = (value: string) => fallbackVar(isLtr, value);
export const rtl = (value: string) => fallbackVar(isRtl, value);
export const ltrRtl = (
  ltrProperty: string,
  rtlProperty: string,
  value: string
) => ({ [ltrProperty]: ltr(value), [rtlProperty]: rtl(value) });
