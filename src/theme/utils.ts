export function asRgbaVars<T extends string>(
  name: T,
  value: null
): Record<`${T}${"R" | "G" | "B" | "A"}`, null>;
export function asRgbaVars<T extends string>(
  name: T,
  value: string
): Record<`${T}${"R" | "G" | "B" | "A"}`, string>;
export function asRgbaVars<T extends string, U extends Record<string, string>>(
  name: T,
  theme: U,
  property: keyof U extends `${infer I}${"R" | "G" | "B" | "A"}` ? I : never
): Record<`${T}${"R" | "G" | "B" | "A"}`, string>;
export function asRgbaVars<N extends string, K extends string>(
  name: N,
  ...[valueOrTheme, property]:
    | [string]
    | [null]
    | [Record<`${K}${"R" | "G" | "B" | "A"}`, string>, K]
): Record<string, string> | Record<string, null> {
  if (valueOrTheme == null)
    return {
      [`${name}R`]: null,
      [`${name}G`]: null,
      [`${name}B`]: null,
      [`${name}A`]: null,
    };
  if (typeof valueOrTheme === "string") {
    return {
      [`${name}R`]: `${parseInt(valueOrTheme.slice(1, 3), 16)}`,
      [`${name}G`]: `${parseInt(valueOrTheme.slice(3, 5), 16)}`,
      [`${name}B`]: `${parseInt(valueOrTheme.slice(5, 7), 16)}`,
      [`${name}A`]: `${Number(
        (parseInt(valueOrTheme.slice(7, 9) || "FF", 16) / 255).toFixed(3)
      )}`,
    };
  }
  return {
    [`${name}R`]: valueOrTheme[`${property!}R`],
    [`${name}G`]: valueOrTheme[`${property!}G`],
    [`${name}B`]: valueOrTheme[`${property!}B`],
    [`${name}A`]: valueOrTheme[`${property!}A`],
  };
}

export function rgba<T extends Record<string, string>>(
  theme: T,
  property: keyof T extends `${infer I}${"R" | "G" | "B" | "A"}` ? I : never
) {
  return `rgba(${theme[`${property}R`]} ${theme[`${property}G`]} ${
    theme[`${property}B`]
  } / ${theme[`${property}A`]})`;
}
