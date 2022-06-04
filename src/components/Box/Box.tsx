import { ComponentProps, JSX } from "solid-js";
import { omitProps, useAllProps } from "../../utils";
import { div } from "./styles.module.css";

export type BoxProps = ComponentProps<"div">;
export function Box(props: BoxProps): JSX.Element {
  const allProps = useAllProps({ props });
  const spreadProps = omitProps(allProps, ["class"]);
  return (
    <div
      class={div}
      style={{ "--cl-elevation-local": 3 }}
      classList={{ [allProps.class!]: true }}
      {...spreadProps}
    />
  );
}
