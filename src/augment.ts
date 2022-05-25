import type { JSX, Component, ComponentProps } from "solid-js";

declare module "solid-js/web" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Dynamic<T extends keyof JSX.IntrinsicElements | Component<any>>(
    props: ComponentProps<T> & { component: T }
  ): JSX.Element;
}
