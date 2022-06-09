import { MergeProps, JSX } from "solid-js";
import { propTraps } from "./propTraps";
type Props = { readonly [K in string | symbol]?: unknown } & {
  readonly [E in `on${string}`]?: JSX.EventHandlerUnion<Element, Event>;
} & {
  readonly classList?: { [x: string]: boolean | undefined };
  readonly class?: string;
  readonly style?: JSX.CSSProperties | string;
  readonly ref?: (ref: unknown) => void;
};

function isEventHandler(property: unknown): property is `on${string}` {
  return typeof property === "string" && property.startsWith("on");
}
function combineHandlers(
  sources: Props[],
  handlerName: `on${string}`
): JSX.EventHandlerUnion<Element, Event> {
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
function combineClasses(sources: Props[]) {
  const classes: string[] = [];
  for (const { class: className } of sources) {
    className && classes.push(className);
  }
  return classes.join(" ");
}
function combineClassLists(
  sources: Props[]
): Record<string, boolean | undefined> | undefined {
  const lists: Record<string, boolean | undefined>[] = [];
  for (const { classList } of sources) {
    classList && lists.push(classList);
  }
  if (lists.length === 0) return {};
  if (lists.length === 1) return lists[0];
  return new Proxy(
    {
      get(className) {
        for (let i = lists.length - 1; i >= 0; i--) {
          const v = lists[i][className as string];
          if (v !== undefined) return v;
        }
      },
      has(className) {
        for (let i = lists.length - 1; i >= 0; i--) {
          if (className in lists[i]) return true;
        }
        return false;
      },
      keys() {
        return [...new Set(lists.flatMap((s) => Object.keys(s)))];
      },
    },
    propTraps
  ) as unknown as Record<string, boolean | undefined>;
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
  const styles: JSX.CSSProperties[] = [];
  for (const { style } of sources) {
    style && styles.push(parseStyle(style));
  }
  if (styles.length === 0) return undefined;
  if (styles.length === 1) return styles[0];
  return new Proxy(
    {
      get(styleName) {
        for (let i = styles.length - 1; i >= 0; i--) {
          const v = styles[i][styleName as string];
          if (v !== undefined) return v;
        }
      },
      has(styleName) {
        for (let i = styles.length - 1; i >= 0; i--) {
          if (styleName in styles[i]) return true;
        }
        return false;
      },
      keys() {
        return [...new Set(styles.flatMap((s) => Object.keys(s)))];
      },
    },
    propTraps
  ) as JSX.CSSProperties;
}
function combineRefs(sources: Props[]): (ref: unknown) => void {
  return (ref) => {
    for (const source of sources) source.ref && source.ref(ref);
  };
}
export function combineProps<T extends object[]>(...sources: T): MergeProps<T>;
export function combineProps<T extends Props[]>(...sources: T): MergeProps<T> {
  if (sources.length === 1) return sources[0] as MergeProps<T>;
  const cache: Record<string, unknown> = {};
  return new Proxy(
    {
      get(property) {
        if (isEventHandler(property))
          return (
            cache[property] ||
            (cache[property] = combineHandlers(sources, property))
          );
        if (property === "classList") return combineClassLists(sources);
        if (property === "style") return combineStyles(sources);
        if (property === "class") return combineClasses(sources);
        if (property === "ref") return (cache[property] = combineRefs(sources));
        for (let i = sources.length - 1; i >= 0; i--) {
          const v = sources[i][property];
          if (v !== undefined) return v;
        }
      },
      has(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          const source = sources[i];
          if (property in source) return true;
        }
        return false;
      },
      keys() {
        return [...new Set(sources.flatMap((s) => Object.keys(s)))];
      },
    },
    propTraps
  ) as unknown as MergeProps<T>;
}
