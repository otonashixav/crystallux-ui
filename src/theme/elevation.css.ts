import { createVar, globalStyle, style } from "@vanilla-extract/css";

const totalElevation1 = createVar();
const totalElevation2 = createVar();
globalStyle(":root", {
  vars: {
    [totalElevation1]: "0",
    [totalElevation2]: "0",
  },
});

export const stateElevation = createVar();
export const localElevation = createVar();
export const totalElevation = createVar();
export const elevatable = style({
  vars: {
    [localElevation]: "0",
    [stateElevation]: "0",
    [totalElevation]: `calc(${totalElevation1} + ${totalElevation2})`,
    [totalElevation2]: `calc(${totalElevation1} + ${localElevation} + ${stateElevation})`,
  },
  selectors: {
    ":not(&) > &": {
      vars: {
        [totalElevation1]: `calc(${totalElevation2} + ${localElevation} + ${stateElevation})`,
        [totalElevation2]: "unset",
      },
    },
    ":not(&) > & > & > &": {
      vars: {
        [totalElevation1]: `calc(${totalElevation2} + ${localElevation} + ${stateElevation})`,
        [totalElevation2]: "unset",
      },
    },
    ":not(&) > & > & > & > & > &": {
      vars: {
        [totalElevation1]: `calc(${totalElevation2} + ${localElevation} + ${stateElevation})`,
        [totalElevation2]: "unset",
      },
    },
  },
});
globalStyle(`${elevatable} > :not(${elevatable})`, {
  vars: {
    [totalElevation2]: totalElevation,
  },
});
