import { MergeProps, JSX, createMemo, runWithOwner, getOwner } from "solid-js";
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
): Record<string, boolean | undefined> {
  const classLists = createMemo(() => {
    const lists: Record<string, boolean | undefined>[] = [];
    for (const { classList } of sources) {
      classList && lists.push(classList);
    }
    return lists;
  });
  return new Proxy(
    {
      get(className) {
        const l = classLists();
        for (let i = l.length - 1; i >= 0; i--) {
          const v = l[i][className as string];
          if (v !== undefined) return v;
        }
      },
      has(className) {
        const l = classLists();
        for (let i = l.length - 1; i >= 0; i--) {
          if (className in l[i]) return true;
        }
        return false;
      },
      keys() {
        return [...new Set(classLists().flatMap((s) => Object.keys(s)))];
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
  const styles = createMemo(() => {
    const styles: (Record<string, boolean | undefined> | string)[] = [];
    for (const { style } of sources) {
      style && styles.push(style);
    }
    return styles;
  });
  const parsedStyles = createMemo(() => styles().map(parseStyle));
  return new Proxy(
    {
      get(styleName) {
        const s = parsedStyles();
        for (let i = s.length - 1; i >= 0; i--) {
          const v = s[i][styleName as string];
          if (v !== undefined) return v;
        }
      },
      has(styleName) {
        const s = parsedStyles();
        for (let i = s.length - 1; i >= 0; i--) {
          if (styleName in s[i]) return true;
        }
        return false;
      },
      keys() {
        return [...new Set(parsedStyles().flatMap((s) => Object.keys(s)))];
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
  const owner = getOwner();
  return new Proxy(
    {
      get(property) {
        if (isEventHandler(property))
          return (
            cache[property] ||
            (cache[property] = combineHandlers(sources, property))
          );
        if (property === "classList")
          return (
            cache[property] ||
            (cache[property] = runWithOwner(owner!, () =>
              combineClassLists(sources)
            ))
          );
        if (property === "style")
          return (
            cache[property] ||
            (cache[property] = runWithOwner(owner!, () =>
              combineStyles(sources)
            ))
          );
        if (property === "ref")
          return cache[property] || (cache[property] = combineRefs(sources));
        if (property === "class") return combineClasses(sources);
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
