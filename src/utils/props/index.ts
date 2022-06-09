import { MergeProps } from "solid-js";
import { combineProps } from "./combineProps";
import { useProviderProps } from "./PropsProvider";

export * from "./combineProps";
export * from "./PropsProvider";
export * from "./omitProps";

export function useAllProps<T extends object, D extends T>({
  props,
  defaultProps,
}: {
  props?: T;
  defaultProps?: D;
} = {}): MergeProps<[T, D]> {
  const allProps = useProviderProps();
  props && allProps.push(props);
  defaultProps && allProps.unshift(defaultProps);
  return combineProps(...allProps) as MergeProps<[T, D]>;
}
