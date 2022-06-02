import { Accessor, createContext, getOwner, useContext } from "solid-js";

export const elevationLocalVar = "--cl-elevation-local";
export const elevationGlobalVar = "--cl-elevation-global";

const ElevationContext = createContext(() => 0);

export function useElevation(localElevation: Accessor<number> | number = 0): {
  [elevationLocalVar]: number;
  [elevationGlobalVar]: number;
} {
  const isAccessor = typeof localElevation === "function";
  const parentElevation = useContext(ElevationContext);
  const globalElevation = isAccessor
    ? () => parentElevation() + localElevation()
    : localElevation
    ? () => parentElevation() + localElevation
    : parentElevation;

  const owner = getOwner();
  if (localElevation && owner)
    (owner.context ||= {})[ElevationContext.id] = globalElevation;

  return {
    get [elevationLocalVar]() {
      return isAccessor ? localElevation() : localElevation;
    },
    get [elevationGlobalVar]() {
      return globalElevation();
    },
  };
}
