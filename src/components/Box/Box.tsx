import { ComponentProps, JSX } from "solid-js";
import { combineWithPassedProps } from "../../utils";
import styles from "./Box.module.css";

export type BoxProps = ComponentProps<"div">;
export function Box(props: BoxProps): JSX.Element {
  const combinedProps = combineWithPassedProps(props);
  return <div class={styles.box} {...combinedProps} />;
}
