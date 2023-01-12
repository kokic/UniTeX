
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
  // proposition: xs => xs,
  // lemma: xs => xs,
  theorem: xs => theoremstyle('theorem', xs),
  // corollary: xs => xs,
  // definition: xs => xs,
  // remark: xs => xs,
  // hypothesis: xs => xs,
  // conjecture: xs => xs,
  // axiom: xs => xs,
  // example: xs => xs,

  // misc family
  center: xs => xs,
}

const matrim = x => x.replace(/\s/g, '').replace(/&/g, ' ')
const matrix = function (xs, ls, rs, lg = ls, rg = rs) {
  let s = ''.concat(...xs.map(x => ls + matrim(x) + rs))
  return xs.length > 1 ? lg + s + rg : s
}
const matred = (xs, lg, rg, sep) => lg + xs.map(matrim).join(sep) + rg

const regexpDoubleLine = /\r\n\r\n|\n\n/

const polymerizeTeX = s => s.trim().replace(/\r\n|\n| (?= )/g, '')

const theoremstyle = function (type, content) {
  let title = Fixed[type] + '. '
  return title + content
    .split(regexpDoubleLine)
    .map(polymerizeTeX)
    .join('\n')
}

export default Environment
