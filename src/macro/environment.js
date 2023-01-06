
const matrim = x => x.replace(/\s/g, '').replace(/&/g, ' ')
const matrix = function (xs, ls, rs, lg = ls, rg = rs) {
  let s = ''.concat(...xs.map(x => ls + matrim(x) + rs))
  return xs.length > 1 ? lg + s + rg : s
}
const matred = (xs, lg, rg, sep) => lg + xs.map(matrim).join(sep) + rg

const Environment = {
  matrix: xs => matred(xs, ' ', ' ', '; '),
  smallmatrix: xs => matred(xs, ' ', ' ', '; '),

  bmatrix: xs => matrix(xs, '[', ']'),
  pmatrix: xs => matrix(xs, '(', ')'),
  vmatrix: xs => matred(xs, '|', '|', '; '),

  Bmatrix: xs => matrix(xs, '{', '}'),
  Vmatrix: xs => matred(xs, '||', '||', '; '),
}

export default Environment
