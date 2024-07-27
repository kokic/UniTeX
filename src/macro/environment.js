
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
  proposition: xs => theorem_style('proposition', xs),
  lemma: xs => theorem_style('lemma', xs),
  theorem: xs => theorem_style('theorem', xs),
  corollary: xs => theorem_style('corollary', xs),
  definition: xs => theorem_style('definition', xs),
  remark: xs => theorem_style('remark', xs),
  hypothesis: xs => theorem_style('hypothesis', xs),
  conjecture: xs => theorem_style('conjecture', xs),
  axiom: xs => theorem_style('axiom', xs),
  example: xs => theorem_style('example', xs),
  proof: xs => theorem_style('proof', xs),

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
const polymerize_tex = function (s) {
  let result = s.trim()
    .replace(/ *\r\n *| *\n *| (?= )/g, '')
    .replace(/ *(,|\.) */g, '$1 ')
  return result
}

const regexpDoubleLine = /\r\n\r\n|\n\n/

const theorem_style = function (type, content) {
  let title = Fixed[type] + '. '
  return title + content
    .split(regexpDoubleLine)
    .map(polymerize_tex)
    .join('\n')
}

export default Environment
