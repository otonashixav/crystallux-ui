import { createVar, globalStyle, style } from "@vanilla-extract/css";

const totalElevation1 = createVar();
const totalElevation2 = createVar();
globalStyle(":root", {
  vars: {
    [totalElevation1]: "0",
    [totalElevation2]: "0",
  },
});

export const localElevation = createVar();
export const totalElevation = createVar();
export const isElevated = style({
  vars: {
    [localElevation]: "0",
    [totalElevation]: `calc(${totalElevation1} + ${totalElevation2})`,
    [totalElevation2]: `calc(${totalElevation1} + ${localElevation})`,
  },
  selectors: {
    ":not(&) > &": {
      vars: {
        [totalElevation1]: `calc(${totalElevation2} + ${localElevation})`,
        [totalElevation2]: "inherit",
      },
    },
    ":not(&) > & > & > &": {
      vars: {
        [totalElevation1]: `calc(${totalElevation2} + ${localElevation})`,
        [totalElevation2]: "inherit",
      },
    },
    ":not(&) > & > & > & > & > &": {
      vars: {
        [totalElevation1]: `calc(${totalElevation2} + ${localElevation})`,
        [totalElevation2]: "inherit",
      },
    },
  },
});
globalStyle(`${isElevated} > :not(${isElevated})`, {
  vars: {
    [totalElevation2]: totalElevation,
  },
});
