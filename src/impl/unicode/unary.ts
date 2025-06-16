
import type { Unary, UnaryOptional } from '../../macro-types.ts';
import { type char } from '../../parsec/string-iterator.ts';

import Proper from './proper.ts';
import Unicode from './unicode-table.ts';

const unchecked_accents = (unicode: char) => (x: char) => `${x}${unicode}`;

// oxlint-disable-next-line no-unused-vars
const unicode_convert = (codepoint: string): string => {
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

  grave: unchecked_accents('\u0300'),
  '`': unchecked_accents('\u0300'),

  acute: unchecked_accents('\u0301'), 
  '\'': unchecked_accents('\u0301'),

  hat: unchecked_accents('\u0302'),
  '^': unchecked_accents('\u0302'),

  tilde: unchecked_accents('\u0303'),
  '~': unchecked_accents('\u0303'),

  bar: unchecked_accents('\u0304'),
  '=': unchecked_accents('\u0304'),

  overline: x => x + (Unicode.isLetterOrGreek(x) ? '\u0305' : '-underline'),
  breve: x => x + (Unicode.isLetterOrGreek(x) ? '\u0306' : '-breve'),
  u: unchecked_accents('\u0306'),

  dot: unchecked_accents('\u0307'),
  '.': unchecked_accents('\u0307'),

  ddot: unchecked_accents('\u0308'),
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
