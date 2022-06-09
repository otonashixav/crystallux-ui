import { ComponentProps, JSX } from "solid-js";
import { omitProps, useAllProps } from "../../utils";
import { div } from "./Box.css";

export type BoxProps = ComponentProps<"div">;
export function Box(props: BoxProps): JSX.Element {
  const allProps = useAllProps({ props });
  const spreadProps = omitProps(allProps, ["class"]);
  return (
    <div class={div}>
      <div class={div}>
        <div class={div}>
          <div
            class={div}
            classList={{ [allProps.class!]: true }}
            {...spreadProps}
          ></div>
        </div>
      </div>
    </div>
  );
}
