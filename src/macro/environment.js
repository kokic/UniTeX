
import Fixed from './fixed.js'

const Environment = {
  // matrix family
  matrix: xs => sepMatrix(xs, ' ', ' ', '; '),
  smallmatrix: xs => sepMatrix(xs, ' ', ' ', '; '),

  bmatrix: xs => regMatrix(xs, '[', ']'),
  pmatrix: xs => regMatrix(xs, '(', ')'),
  vmatrix: xs => sepMatrix(xs, '|', '|', '; '),

  Bmatrix: xs => regMatrix(xs, '{', '}'),
  Vmatrix: xs => sepMatrix(xs, '||', '||', '; '),

  // theorem family
  proposition: xs => theoremstyle('proposition', xs),
  lemma: xs => theoremstyle('lemma', xs),
  theorem: xs => theoremstyle('theorem', xs),
  corollary: xs => theoremstyle('corollary', xs),
  definition: xs => theoremstyle('definition', xs),
  remark: xs => theoremstyle('remark', xs),
  hypothesis: xs => theoremstyle('hypothesis', xs),
  conjecture: xs => theoremstyle('conjecture', xs),
  axiom: xs => theoremstyle('axiom', xs),
  example: xs => theoremstyle('example', xs),
  proof: xs => theoremstyle('proof', xs),

  // misc family
  // center: xs => xs,

  // document: xs => xs,
}

const doubleBackslash = '\\\\'

const matrim = x => x.replace(/\s/g, '').replace(/&/g, ' ')

const regMatrix = function (gel, ls, rs, lg = ls, rg = rs) {
  const xs = gel.split(doubleBackslash)
  const s = ''.concat(...xs.map(x => ls + matrim(x) + rs))
  return xs.length > 1 ? lg + s + rg : s
}

const sepMatrix = function (gel, lg, rg, sep) {
  const xs = gel.split(doubleBackslash)
  return lg + xs.map(matrim).join(sep) + rg
}



/**
 * Adjustments to text formatting (such as spaces, line breaks, and indents)
 * are made after macro replacement Therefore, the current processing is not
 * friendly to macros such as quad The specific scheme for the format in the
 * environment is still under discussion, so this question will be put on
 * hold temporarily.
 *
 */
const polymerizeTeX = function (s) {
  let result = s.trim()
    .replace(/ *\r\n *| *\n *| (?= )/g, '')
    .replace(/ *(\,|\.) */g, '$1 ')
  return result
}

const regexpDoubleLine = /\r\n\r\n|\n\n/

const theoremstyle = function (type, content) {
  let title = Fixed[type] + '. '
  return title + content
    .split(regexpDoubleLine)
    .map(polymerizeTeX)
    .join('\n')
}

export default Environment
