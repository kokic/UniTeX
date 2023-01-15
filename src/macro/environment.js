
import Fixed from './fixed.js'

const Environment = {
  // matrix family
  matrix: xs => matred(xs, ' ', ' ', '; '),
  smallmatrix: xs => matred(xs, ' ', ' ', '; '),

  bmatrix: xs => matrix(xs, '[', ']'),
  pmatrix: xs => matrix(xs, '(', ')'),
  vmatrix: xs => matred(xs, '|', '|', '; '),

  Bmatrix: xs => matrix(xs, '{', '}'),
  Vmatrix: xs => matred(xs, '||', '||', '; '),

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

const matrim = x => x.replace(/\s/g, '').replace(/&/g, ' ')
const matrix = function (xs, ls, rs, lg = ls, rg = rs) {
  let s = ''.concat(...xs.map(x => ls + matrim(x) + rs))
  return xs.length > 1 ? lg + s + rg : s
}
const matred = (xs, lg, rg, sep) => lg + xs.map(matrim).join(sep) + rg

const regexpDoubleLine = /\r\n\r\n|\n\n/


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

const theoremstyle = function (type, content) {
  let title = Fixed[type] + '. '
  return title + content
    .split(regexpDoubleLine)
    .map(polymerizeTeX)
    .join('\n')
}

export default Environment
