import { $PROXY } from "solid-js";
// propTraps from solid-js core
export const propTraps: ProxyHandler<{
  get: (k: string) => unknown;
  has: (k: string) => boolean;
  keys: () => string[];
}> = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver;
    return _.get(property);
  },
  has(_, property) {
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn,
    };
  },
  ownKeys(_) {
    return _.keys();
  },
} as ProxyHandler<{
  get: (k: string | symbol) => unknown;
  has: (k: string | symbol) => boolean;
  keys: () => string[];
}>;

function trueFn() {
  return true;
}
