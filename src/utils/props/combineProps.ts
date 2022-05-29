import { MergeProps, $PROXY, JSX } from "solid-js";
import { usePassedProps } from "./passProps";
type Props = { readonly [K in string | symbol]?: unknown } & {
  readonly [E in `on${string}`]?: JSX.EventHandlerUnion<Element, Event>;
} & {
  readonly classList?: { [x: string]: boolean | undefined; [x: symbol]: never };
  readonly class?: string;
  readonly style?: JSX.CSSProperties | string;
  readonly ref?: (ref: unknown) => void;
};

function trueFn() {
  return true;
}

// propTraps from solid-js core
const propTraps: ProxyHandler<{
  get: (k: string | symbol) => unknown;
  has: (k: string | symbol) => boolean;
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
};

function isEventHandler(property: string): property is `on${string}` {
  return property.startsWith("on");
}
function combineHandlers(
  sources: Props[],
  handlerName: `on${string}`
): JSX.EventHandlerUnion<Element, Event> | undefined {
  if (sources.length === 1) return sources[0][handlerName];
  return (event) => {
    let immediatePropagationStopped = false;
    const stopImmediatePropagation = event.stopImmediatePropagation;
    event.stopImmediatePropagation = () => {
      immediatePropagationStopped = true;
      stopImmediatePropagation.apply(event);
    };
    for (const source of sources) {
      if (immediatePropagationStopped) return;
      const handler = source[handlerName];
      if (typeof handler === "function") {
        handler(event);
      } else if (Array.isArray(handler)) {
        const f = handler[0];
        if (typeof f === "function") {
          f(handler[1], event);
        }
      }
    }
  };
}
function combineClasses(sources: Props[]): Record<string, boolean | undefined> {
  const combinedList: Record<string, boolean | undefined> = {};
  for (const source of sources) {
    const className = source.class;
    if (className) combinedList[className] = true;
    const classList = source.classList;
    if (classList) Object.assign(combinedList, classList);
  }
  return combinedList;
}
const extractStyleRegex = /([^:;\s]+)\s*:\s*([^;]+)/g;
function parseStyle(style: string | JSX.CSSProperties): JSX.CSSProperties {
  if (typeof style === "object") return style;
  const styleObject: JSX.CSSProperties = {};
  for (
    let match = extractStyleRegex.exec(style);
    match;
    match = extractStyleRegex.exec(style)
  ) {
    const [, name, value] = match;
    styleObject[name] = value;
  }
  return styleObject;
}
function combineStyles(
  sources: Props[]
): JSX.CSSProperties | string | undefined {
  if (sources.length === 1) return sources[0].style;
  const combinedStyles: JSX.CSSProperties = {};
  for (const source of sources) {
    const style = source.style;
    if (style) Object.assign(combinedStyles, parseStyle(style));
  }
  return combinedStyles;
}
function combineRefs(sources: Props[]): ((ref: unknown) => void) | undefined {
  if (sources.length === 1) return sources[0].ref;
  return (ref) => {
    for (const source of sources) source.ref && source.ref(ref);
  };
}
export function combineProps<T extends Props[]>(...sources: T): MergeProps<T> {
  return new Proxy(
    {
      get(property) {
        if (typeof property !== "symbol" && isEventHandler(property))
          return combineHandlers(sources, property);
        if (property === "class") return undefined;
        if (property === "classList") return combineClasses(sources);
        if (property === "style") return combineStyles(sources);
        if (property === "ref") return combineRefs(sources);
        for (let i = sources.length - 1; i >= 0; i--) {
          const source = sources[i];
          const v = source[property];
          if (v !== undefined) return v;
        }
      },
      has(property) {
        if (property === "class") return false;
        for (let i = sources.length - 1; i >= 0; i--) {
          const source = sources[i];
          if (
            property in source ||
            (property === "classList" && "class" in source)
          )
            return true;
        }
        return false;
      },
      keys() {
        const keysSet = new Set(sources.flatMap((s) => Object.keys(s)));
        if (keysSet.has("class")) keysSet.add("classList");
        keysSet.delete("class");
        return [...keysSet];
      },
    },
    propTraps
  ) as unknown as MergeProps<T>;
}

export function combineWithPassedProps<T extends object>(
  props: T,
  ...defaultProps: [] | [defaultProps: Props]
): T {
  return combineProps(...defaultProps, ...usePassedProps(), props) as T;
}
