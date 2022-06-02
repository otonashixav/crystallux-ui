import { propTraps } from "./propTraps";

export function omitProps<T, K extends keyof T>(
  props: T,
  keys: K[]
): Omit<T, K> {
  const blocked = new Set<keyof T>(keys);
  return new Proxy(
    {
      get(property: string | number | symbol) {
        return blocked.has(property as keyof T)
          ? undefined
          : props[property as keyof T];
      },
      has(property: string | number | symbol) {
        return blocked.has(property as keyof T) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter((k) => !blocked.has(k as keyof T));
      },
    },
    propTraps
  ) as unknown as Omit<T, K>;
}
