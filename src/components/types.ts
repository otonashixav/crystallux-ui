import { Component, JSX } from "solid-js";

// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyComponent<T = {}> =
  | keyof {
      [K in keyof JSX.IntrinsicElements as JSX.IntrinsicElements[K] extends T
        ? K
        : never]: 0;
    }
  | Component<T>;
