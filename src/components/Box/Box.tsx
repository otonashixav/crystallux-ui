import { Component, ComponentProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { combineProps } from "../../utils/combineProps";
import styles from "./Box.module.css";

interface BoxRequiredProps {}
type BoxProps<
  T extends keyof JSX.IntrinsicElements | Component<BoxRequiredProps> = "div"
> = ComponentProps<T> & {
  component?: T;
};
const defaultProps = { component: "div", class: styles.Box } as const;
Box.defaultProps = defaultProps;

export default Box;
export function Box<
  T extends keyof JSX.IntrinsicElements | Component<BoxRequiredProps> = "div"
>(props: BoxProps<T>): JSX.Element {
  const combinedProps = combineProps(defaultProps, props);
  return <Dynamic {...combinedProps} />;
}
