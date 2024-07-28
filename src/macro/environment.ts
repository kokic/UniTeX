
import Fixed from './fixed.ts'

type Environment = {
  [key: string]: (s: string) => string
};

const Environment: Environment = {
  // matrix family
  matrix: s => separateMatrix(s, ' ', ' ', '; '),
  smallmatrix: s => separateMatrix(s, ' ', ' ', '; '),

  bmatrix: s => regularMatrix(s, '[', ']'),
  pmatrix: s => regularMatrix(s, '(', ')'),
  vmatrix: s => separateMatrix(s, '|', '|', '; '),

  Bmatrix: s => regularMatrix(s, '{', '}'),
  Vmatrix: s => separateMatrix(s, '||', '||', '; '),

  // theorem family
  proposition: s => theorem_style('proposition', s),
  lemma: s => theorem_style('lemma', s),
  theorem: s => theorem_style('theorem', s),
  corollary: s => theorem_style('corollary', s),
  definition: s => theorem_style('definition', s),
  remark: s => theorem_style('remark', s),
  hypothesis: s => theorem_style('hypothesis', s),
  conjecture: s => theorem_style('conjecture', s),
  axiom: s => theorem_style('axiom', s),
  example: s => theorem_style('example', s),
  proof: s => theorem_style('proof', s),

  // misc family
  // center: xs => xs,
  // document: xs => xs,
}

const doubleBackslash = '\\\\';

const matrixM = (s: string) => s.replace(/\s/g, '').replace(/&/g, ' ');

const regularMatrix = function (
  matrix: string, 
  leftSymbol: string, 
  rightSymbol: string, 
  leftGlobalSymbol: string = leftSymbol, 
  rightGlobalSymbol: string = rightSymbol
) {
  const xs = matrix.split(doubleBackslash);
  const s = ''.concat(...xs.map(s => leftSymbol + matrixM(s) + rightSymbol));
  return xs.length > 1 ? leftGlobalSymbol + s + rightGlobalSymbol : s;
}

const separateMatrix = function (
  matrix: string,
  leftGlobalSymbol: string,
  rightGlobalSymbol: string,
  separator: string
) {
  const xs = matrix.split(doubleBackslash);
  return leftGlobalSymbol + xs.map(matrixM).join(separator) + rightGlobalSymbol;
}



/**
 * Adjustments to text formatting (such as spaces, line breaks, and indents)
 * are made after macro replacement Therefore, the current processing is not
 * friendly to macros such as quad The specific scheme for the format in the
 * environment is still under discussion, so this question will be put on
 * hold temporarily.
 *
 */
const polymerize_tex = function (s: string) {
  let result = s.trim()
    .replace(/ *\r\n *| *\n *| (?= )/g, '')
    .replace(/ *(,|\.) */g, '$1 ')
  return result;
}

const regexpDoubleLine = /\r\n\r\n|\n\n/;

const theorem_style = function (type: string, content: string) {
  let title = Fixed[type] + '. ';
  return title + content
    .split(regexpDoubleLine)
    .map(polymerize_tex)
    .join('\n')
}

export default Environment;
