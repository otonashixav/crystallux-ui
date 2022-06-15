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

export function rgba(rgb: string, a?: string) {
  return a ? `rgba(${rgb} / ${a})` : `rgb(${rgb})`;
}
