import { MergeProps } from "solid-js";
import { combineProps } from "./combineProps";
import { consumePassedProps } from "./passProps";

export * from "./combineProps";
export * from "./passProps";
export * from "./omitProps";

export function useAllProps<T extends object, D extends T>({
  props,
  defaultProps,
}: {
  props?: T;
  defaultProps?: D;
} = {}): MergeProps<[T, D]> {
  const allProps = consumePassedProps();
  props && allProps.push(props);
  defaultProps && allProps.unshift(defaultProps);
  return combineProps(...allProps) as MergeProps<[T, D]>;
}
