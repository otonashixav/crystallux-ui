import {
  createComponent,
  createContext,
  FlowProps,
  getOwner,
  JSX,
  splitProps,
} from "solid-js";

export const PassedPropsContext = createContext();

export function usePassedProps(): object[] {
  const passableProps: object[] = [];
  let owner = getOwner();
  (owner!.context ||= {})[PassedPropsContext.id] = null;
  for (owner = owner!.owner; owner; owner = owner.owner) {
    if (!owner.context) continue;
    const props = owner.context[PassedPropsContext.id] as
      | object
      | undefined
      | null;
    if (props === null) break;
    if (props) passableProps.push(props);
  }
  return passableProps;
}

export function PassProps<T>(props: FlowProps<T>): JSX.Element {
  const [, value] = splitProps(props, ["children"]);
  return createComponent(PassedPropsContext.Provider, {
    value,
    get children() {
      return props.children;
    },
  });
}
