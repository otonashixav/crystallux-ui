/* eslint-env node */
const postcssPresetEnv = require("postcss-preset-env");

const processed = Symbol();
const getProps = (name) => [..."rgba"].map((part) => `${name}-${part}`);
const getVars = (name, fallback) =>
  [..."rgba"].map(
    (part, i) => `var(${name}-${part}${fallback ? `, ${fallback[i]}` : ""})`
  );
const colorToRGBA = (color) => {
  let match;
  let r, g, b, a;
  if (
    (match = color.match(
      /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])?$|^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/
    ))
  ) {
    [, r, g, b, a = 1] = match
      .filter((v) => v !== undefined)
      .map((h) => parseInt(h, 16));
    a /= 255;
  } else if (
    (match = color.match(
      /^rgba?\(\s*([0-9]+)\s*,?\s*([0-9]+)\s*,?\s([0-9]+)\s*(?:[,/]\s*([01]+.?[0-9]*))?\)$/
    ))
  ) {
    [, r, g, b, a = 1] = match;
  } else {
    throw new Error(`${color} is not a valid color.`);
  }
  return [r, g, b, a];
};

module.exports = {
  plugins: [
    postcssPresetEnv({ stage: 1 }),
    {
      postcssPlugin: "postcss-plugin-blend",
      Declaration(decl) {
        if (/^--cl-color-(?!.*-[rgba]$)/.test(decl.prop) && !decl[processed]) {
          decl[processed] = true;
          const [rProp, gProp, bProp, aProp] = getProps(decl.prop);
          const [r, g, b, a] = getVars(decl.prop);
          let rVal, gVal, bVal, aVal, match;
          if (
            (match = decl.value.match(
              /^--blend\(var\(\s*([^ ,()]*)\)\s*,\s*var\(([^ ,()]*)\s*\)\)$/
            ))
          ) {
            const [r1, g1, b1, a1] = getVars(match[1]);
            const [r2, g2, b2, a2] = getVars(match[2]);
            rVal = `calc(${r1} * ${a1} + ${r2} * ${a2} - ${r1} * ${a})`;
            gVal = `calc(${g1} * ${a1} + ${g2} * ${a2} - ${g1} * ${a})`;
            bVal = `calc(${b1} * ${a1} + ${b2} * ${a2} - ${b1} * ${a})`;
            aVal = `calc(${a1} + ${a2} - ${a1} * ${a2})`;
          } else if (
            (match = decl.value.match(
              /^var\(\s*([^ ,()]*)\s*,\s*([^ ,()]*)\s*\)$/
            ))
          ) {
            [rVal, gVal, bVal, aVal] = getVars(match[1], colorToRGBA(match[2]));
          } else {
            [rVal, gVal, bVal, aVal] = colorToRGBA(decl.value);
          }
          decl
            .before(`\n${rProp}: ${rVal}`)
            .before(`\n${gProp}: ${gVal}`)
            .before(`\n${bProp}: ${bVal}`)
            .before(`\n${aProp}: ${aVal}`);
          decl.value = `rgba(${r} ${g} ${b} / ${a})`;
        }
      },
    },
  ],
};
