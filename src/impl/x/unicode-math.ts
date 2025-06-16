import { Fixed, FixedValue } from "../../macro-types";
import stableFixed from "../unicode/fixed";

const FixedUnicodeMath: Fixed = {
  // U+02247
  ncong: { category: 'unicode-math', value: '≇' },
  approx: { category: 'unicode-math', value: '≈' },
  napprox: { category: 'unicode-math', value: '≉' },
  approxeq: { category: 'unicode-math', value: '≊' },
  approxident: { category: 'unicode-math', value: '≋' },
  backcong: { category: 'unicode-math', value: '≌' },
  asymp: { category: 'unicode-math', value: '≍' },
  Bumpeq: { category: 'unicode-math', value: '≎' },
  bumpeq: { category: 'unicode-math', value: '≏' },
  doteq: { category: 'unicode-math', value: '≐' },
  Doteq: { category: 'unicode-math', value: '≑' },
  fallingdotseq: { category: 'unicode-math', value: '≒' },
  risingdotseq: { category: 'unicode-math', value: '≓' },
  coloneq: { category: 'unicode-math', value: '≔' },
  eqcolon: { category: 'unicode-math', value: '≕' },
  eqcirc: { category: 'unicode-math', value: '≖' },
  circeq: { category: 'unicode-math', value: '≗' },
  arceq: { category: 'unicode-math', value: '≘' },
  wedgeq: { category: 'unicode-math', value: '≙' },
  veeeq: { category: 'unicode-math', value: '≚' },
  stareq: { category: 'unicode-math', value: '≛' },
  triangleq: { category: 'unicode-math', value: '≜' },
  eqdef: { category: 'unicode-math', value: '≝' },
  measeq: { category: 'unicode-math', value: '≞' },
  questeq: { category: 'unicode-math', value: '≟' },
};

const UnicodeMathOversetLookup = {
  '?=': (FixedUnicodeMath.questeq as FixedValue).value,
  'm=': (FixedUnicodeMath.measeq as FixedValue).value,
  'def=': (FixedUnicodeMath.eqdef as FixedValue).value,

  [stableFixed.star as string + '=']: (FixedUnicodeMath.stareq as FixedValue).value,
  [stableFixed.Delta + '=']: (FixedUnicodeMath.triangleq as FixedValue).value,
};

export { FixedUnicodeMath, UnicodeMathOversetLookup };
