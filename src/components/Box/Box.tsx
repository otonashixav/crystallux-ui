import { ComponentProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AnyComponent } from "../../types";
import { combineWithPassedProps } from "../../utils";
import styles from "./Box.module.css";

const defaultProps = { component: "div", class: styles.box } as const;
Box.defaultProps = defaultProps;

export type BoxProps<T extends AnyComponent = "div"> = ComponentProps<T> & {
  component?: T;
};
export default Box;
export function Box<T extends AnyComponent = "div">(
  props: BoxProps<T>
): JSX.Element {
  const allProps = combineWithPassedProps(props, defaultProps);
  return <Dynamic {...allProps} />;
}
