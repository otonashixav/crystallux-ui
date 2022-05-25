import { MergeProps, $PROXY } from "solid-js";

const eventHandlerRegex = /^on[A-Z]/;

function trueFn() {
  return true;
}

type ResolveSource<T> = T extends infer I | (() => infer I) ? I : never;
function resolveSource<T>(s: T | null | undefined): ResolveSource<T> {
  return (
    (s = typeof s === "function" ? s() : s) == null ? {} : s
  ) as ResolveSource<T>;
}

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

export function combineProps<T extends [unknown, ...(readonly unknown[])]>(
  ...sources: T
): MergeProps<T>;
export function combineProps<
  T extends [
    Record<string | symbol, unknown>,
    ...(readonly Record<string | symbol, unknown>[])
  ]
>(...sources: T): Omit<MergeProps<T>, "class"> {
  return new Proxy(
    {
      get(property) {
        if (typeof property !== "symbol" && eventHandlerRegex.test(property))
          return (event: Event) => {
            let immediatePropagationStopped = false;
            const stopImmediatePropagation = event.stopImmediatePropagation;
            event.stopImmediatePropagation = () => {
              immediatePropagationStopped = true;
              stopImmediatePropagation.apply(event);
            };
            for (const props of sources) {
              if (immediatePropagationStopped) return;
              const handler = props[property] || props[property.toLowerCase()];
              if (typeof handler === "function") {
                handler(event);
              } else if (Array.isArray(handler)) {
                const f = handler[0];
                if (typeof f === "function") {
                  f(event, handler[1]);
                }
              }
            }
          };
        if (property === "class") return undefined;
        if (property === "classList" || property === "style")
          return new Proxy(
            {
              get(classOrStyle) {
                for (let i = sources.length - 1; i >= 0; i--) {
                  const s = resolveSource(sources[i]);
                  const classListOrStyle = s[property] as
                    | Record<string | symbol, string>
                    | undefined;
                  if (classListOrStyle != null) {
                    const v = classListOrStyle[classOrStyle];
                    if (v !== undefined) return v;
                  }
                  if (property === "classList" && classOrStyle === s.class)
                    return true;
                }
              },
              has(classOrStyle) {
                for (let i = sources.length - 1; i >= 0; i--) {
                  const s = resolveSource(sources[i]);
                  const classListOrStyle = s[property] as
                    | Record<string | symbol, string>
                    | undefined;
                  if (
                    classListOrStyle != null &&
                    classOrStyle in classListOrStyle
                  )
                    return true;
                  if (property === "classList" && classOrStyle === s.class)
                    return true;
                }
                return false;
              },
              keys() {
                const keys = [];
                for (let i = 0; i < sources.length; i++) {
                  const s = resolveSource(sources[i]);
                  const v = s[property];
                  if (v != null)
                    keys.push(
                      ...Object.keys(v as Record<string | symbol, string>)
                    );
                  if (s.class) keys.push(s.class as string);
                }
                return [...new Set(keys)];
              },
            },
            propTraps
          );
        for (let i = sources.length - 1; i >= 0; i--) {
          const v = resolveSource(sources[i])[property];
          if (v !== undefined) return v;
        }
      },
      has(property) {
        if (property === "class") return false;
        for (let i = sources.length - 1; i >= 0; i--) {
          const s = resolveSource(sources[i]);
          if (property in s || (property === "classList" && "class" in s))
            return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i = 0; i < sources.length; i++)
          keys.push(...Object.keys(resolveSource(sources[i])));
        const keysSet = new Set(keys);
        if (keysSet.has("class")) keysSet.add("classList");
        keysSet.delete("class");
        return [...keysSet];
      },
    },
    propTraps
  ) as unknown as MergeProps<T>;
}
