import { ComplexStyleRule, style } from "@vanilla-extract/css";

function createMappedStyles<T extends [...string[]]>(
  map: (...values: T) => ComplexStyleRule
): (...values: T | [...values: T, isUserStyle: true]) => string {
  const cache = new Map<string, string>();
  return (...values) => {
    const key = values.join("");
    const cached = cache.get(key);
    if (cached) return cached;
    const className = style(map(...(values as T)));
    cache.set(key, className);
    return className;
  };
}
