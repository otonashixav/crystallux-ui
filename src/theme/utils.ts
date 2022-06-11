export type RGBA<T> = Record<"R" | "G" | "B" | "A", T>;
export function asRGBA(): RGBA<null>;
export function asRGBA(color: string): RGBA<string>;
export function asRGBA(value?: undefined | string): RGBA<null> | RGBA<string> {
  if (value === undefined) return { R: null, G: null, B: null, A: null };
  return {
    R: `${parseInt(value.slice(1, 3), 16)}`,
    G: `${parseInt(value.slice(3, 5), 16)}`,
    B: `${parseInt(value.slice(5, 7), 16)}`,
    A: `${Number((parseInt(value.slice(7, 9) || "FF", 16) / 255).toFixed(3))}`,
  };
}

export function rgba(value: RGBA<string>): string {
  return `rgba(${value.R} ${value.G} ${value.B} / ${value.A})`;
}
