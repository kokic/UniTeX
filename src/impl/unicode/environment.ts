
import { Environment } from '../../macro-types.ts';

import Fixed from './fixed.ts';

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
  proposition: s => theoremStyle('proposition', s),
  lemma: s => theoremStyle('lemma', s),
  theorem: s => theoremStyle('theorem', s),
  corollary: s => theoremStyle('corollary', s),
  definition: s => theoremStyle('definition', s),
  remark: s => theoremStyle('remark', s),
  hypothesis: s => theoremStyle('hypothesis', s),
  conjecture: s => theoremStyle('conjecture', s),
  axiom: s => theoremStyle('axiom', s),
  example: s => theoremStyle('example', s),
  proof: s => theoremStyle('proof', s),

  // misc family
  // center: xs => xs,
  // document: xs => xs,
}

const doubleBackslash = '\\\\';

const matrixM = (s: string) => s.replace(/\s/g, '').replace(/&/g, ' ');

const regularMatrix = function (
  matrix: string,
  leftMark: string,
  rightMark: string,
  leftOuterMark: string = leftMark,
  rightOuterMark: string = rightMark
) {
  const xs = matrix.split(doubleBackslash);
  const s = ''.concat(...xs.map(s => leftMark + matrixM(s) + rightMark));
  return xs.length > 1 ? leftOuterMark + s + rightOuterMark : s;
}

const separateMatrix = function (
  matrix: string,
  leftOuterMark: string,
  rightOuterMark: string,
  separator: string
) {
  const xs = matrix.split(doubleBackslash);
  return leftOuterMark + xs.map(matrixM).join(separator) + rightOuterMark;
}



/**
 * Adjustments to text formatting (such as spaces, line breaks, and indents)
 * are made after macro replacement Therefore, the current processing is not
 * friendly to macros such as quad The specific scheme for the format in the
 * environment is still under discussion, so this question will be put on
 * hold temporarily.
 *
 */
const polymerize = function (s: string) {
  let result = s.trim()
    .replace(/ *\r\n *| *\n *| (?= )/g, '')
    .replace(/ *(,|\.) */g, '$1 ')
  return result;
}

const regexpDoubleLine = /\r\n\r\n|\n\n/;

const theoremStyle = function (type: string, content: string) {
  let title = Fixed[type] + '. ';
  return title + content
    .split(regexpDoubleLine)
    .map(polymerize)
    .join('\n')
}

export default Environment;
