
import { type Unary, type UnaryOptional } from '../../cli.ts';
import { type char } from '../../parsec/string-iterator.js';

import Proper from './proper.js';
import Unicode from './unicode-table.js';

// type char = string;

const unchecked_accents = (unicode: char) => (x: char) => `${x}${unicode}`;

const unicode_convert = (codepoint: string) => {
  const head = codepoint.charAt(0);
  const base = head == `"` ? 16 : head == `'` ? 8 : 10;
  const code = base == 10 ? codepoint : codepoint.substring(1); 
  return String.fromCodePoint(parseInt(code, base));
};

const Unary: Unary = {
  id: x => x,
  text: x => x,
  mathrm: x => x, 

  sqrt: x => '√' + Proper.paren(x),
  cbrt: x => '∛' + Proper.paren(x), // original
  furt: x => '∜' + Proper.paren(x), // original

  grave: x => x + (Unicode.isLetterOrGreek(x) ? '\u0300' : '-grave'),
  '`': unchecked_accents('\u0300'),

  acute: x => x + (Unicode.isLetterOrGreek(x) ? '\u0301' : '-acute'),
  '\'': unchecked_accents('\u0301'),

  hat: x => x + (Unicode.isLetterOrGreek(x) ? '\u0302' : '-hat'),
  '^': unchecked_accents('\u0302'),

  tilde: x => x + (Unicode.isLetterOrGreek(x) ? '\u0303' : '-tilde'),
  '~': unchecked_accents('\u0303'),

  bar: x => x + (Unicode.isLetterOrGreek(x) ? '\u0304' : '-bar'),
  '=': unchecked_accents('\u0304'),

  overline: x => x + (Unicode.isLetterOrGreek(x) ? '\u0305' : '-underline'),
  breve: x => x + (Unicode.isLetterOrGreek(x) ? '\u0306' : '-breve'),
  u: unchecked_accents('\u0306'),

  '.': unchecked_accents('\u0307'),
  '"': unchecked_accents('\u0308'),

  r: unchecked_accents('\u030A'),
  H: unchecked_accents('\u030B'),
  v: unchecked_accents('\u030C'),
  not: unchecked_accents('\u0338'),

  kern: x => x.endsWith('em') ? ' '.repeat(+ x.substring(0, x.length - 2)) : ' ',
};
export default Unary;

const UnaryOptional: UnaryOptional = {
  sqrt: (n: string, x: string) => {
    switch (n) {
      case "2": return Unary.sqrt(x);
      case "3": return Unary.cbrt(x);
      case "4": return Unary.furt(x);
      default: return Unicode.suprender(n) + Unary.sqrt(x);
    }
  },
};

for (const key of ["mkern", "mskip", "hskip", "hspace"]) {
  Unary[key] = Unary.kern;
}

Unicode.typefaceNames.forEach(x => Unary[x] = s => Unicode.render_if_exists(s, x));

/* just for typeface: Parser */
const UnaryTypefaceNames = ['text', 'mathrm', ...Unicode.typefaceNames];
export { UnaryTypefaceNames };

export { UnaryOptional };
