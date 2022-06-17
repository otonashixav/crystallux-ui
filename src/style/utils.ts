import { ComplexStyleRule, style } from "@vanilla-extract/css";
/**
 * Converts a 6-digit hexadecimal color to space separated RGB.
 * @param hex 6-digit hexadecimal color starting with #.
 * @returns Space separated RGB.
 *
 * @example
 * ```ts
 * const rgb = hexToRGB("#FFFFFF");
 * rgb === "255 255 255"
 * ```
 */
export function hexToRGB(hex: string): string {
  const match = hex.match(
    /^#([0-9A-Fa-z]{2})([0-9A-Fa-z]{2})([0-9A-Fa-z]{2})$/
  );
  if (!match) throw new Error(`${hex} is not a 6-digit hexadecimal color.`);
  return match
    .slice(1)
    .map((v) => parseInt(v, 16))
    .join(" ");
}

export function rgb(rgb: string) {
  return `rgb(${rgb})`;
}

export function rgba(rgb: string, a: string) {
  return `rgba(${rgb} / ${a})`;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res = {} as Pick<T, K>;
  for (const key of keys) res[key] = obj[key];
  return res;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const res = { ...obj };
  for (const key of keys) delete res[key];
  return res;
}

export function mapObject<T extends Record<string, unknown>, U>(
  obj: T,
  map: (...args: { [K in keyof T]: [value: T[K], key: K] }[keyof T]) => U
): Record<keyof T, U> {
  const res = {} as Record<keyof T, U>;
  for (const key in obj) {
    res[key] = map(obj[key], key);
  }
  return res;
}

export function createMappedStyles<T>(
  map: (value: T) => ComplexStyleRule,
  debugId: string
): (value: T) => string {
  const cache = new Map<string, string>();
  return (value) => {
    const key = String(value);
    const cached = cache.get(key);
    if (cached) return cached;
    const className = style(map(value), `${debugId}_${key}`);
    cache.set(key, className);
    return className;
  };
}
