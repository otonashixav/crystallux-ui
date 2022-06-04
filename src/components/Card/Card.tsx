import { ComponentProps } from "solid-js";
import { useAllProps } from "../../utils";

export interface CardProps extends ComponentProps<"div"> {
  variant?: "elevated" | "filled" | "outlined" | "none" | undefined;
}
const defaultProps = {variant: ""} as const
export function Card(props: CardProps) {
  const allProps = useAllProps()
}
