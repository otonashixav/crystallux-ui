import {
  createComponent,
  createContext,
  FlowProps,
  getOwner,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";

export const ProviderPropsContext = createContext();

export function useProviderProps(): object[] {
  const providerProps: object[] = [];
  let owner = getOwner();
  if (!owner) return providerProps;
  (owner.context ||= {})[ProviderPropsContext.id] = null;
  for (owner = owner.owner; owner; owner = owner.owner) {
    if (!owner.context) continue;
    const props = owner.context[ProviderPropsContext.id] as
      | object
      | undefined
      | null;
    if (props === null) break;
    if (props) providerProps.push(props);
  }
  return providerProps;
}

export function PropsProvider<T>(
  props: FlowProps<T> & { $children?: JSX.Element }
): JSX.Element {
  const [, propsWithoutChildren] = splitProps(props, ["children", "$children"]);
  const value =
    "$children" in props
      ? mergeProps(propsWithoutChildren, {
          get children() {
            return props.$children;
          },
        })
      : propsWithoutChildren;
  return createComponent(ProviderPropsContext.Provider, {
    value,
    get children() {
      return props.children;
    },
  });
}
