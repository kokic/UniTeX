
import { type char } from '../../parsec/string-iterator.ts';

import Proper from './proper.ts';
// import "./parsec/declare-global.ts";

type SMap = { [key: string]: string };

type Typeface = {
  mathbf: SMap;
  mathit: SMap;
  mathsf: SMap;
  mathscr: SMap;
  mathcal: SMap;
  mathfrak: SMap;
  mathbb: SMap;
  texttt: SMap;
};

const Unicode = {
  typeface: {} as Typeface,

  isLetterOrGreek: (s: string) => s.boundedIn('a', 'z') || s.boundedIn('A', 'Z') || s.boundedIn('α', '϶') || s.boundedIn('Α', 'Ω'),

  /**
   * @returns string from code point `a` to `b`
   */
  series: (a: char, b: char) => {
    let [start, end] = [a.codePointAt(0)!, b.codePointAt(0)!];
    let length = end - start + 1;
    let codes = Array.from({ length: length }, (_, x) => x + start);
    return String.fromCodePoint(...codes);
  },

  alphabets: (...table: string[]) => {
    let map: SMap = Object.create(null);
    Unicode["letterArray"].forEach((x: string, i: number) => map[x] = table[i]);
    return map;
  },

  block: (a: char, b: char, names: string[]) => {
    let map = new Object();
    let data = Unicode.series(a, b);
    names.forEach((name, i) => name && (map[name] = data[i]));
    return map;
  },

  /**
   * Renders the given string if it exists, using the specified unicode typeface.
   *
   * @param {string} s - The string to render.
   * @param {string} name - The name of the Unicode typeface to use.
   * @return {string} - The rendered string.
   */
  render_if_exists: (s: string, name: string): string =>
    Array.from(s).map(x => Unicode.typeface[name][x] || x).join(''),

  /**
   * Checks if all characters in the given string are present in the charset object.
   *
   * @param {object} charset - The charset object containing the characters to check against.
   * @param {string} str - The string to be checked.
   * @param {function} otherwise - The callback function to be called if the characters are not present.
   * @return {string} Returns if all characters are present or the result of the otherwise callback.
   */
  render_if_forall: (
    charset: SMap,
    str: string,
    otherwise: (s: string) => string = x => x
  ): string => {
    const array = Array.from(str);
    let through = true;

    for (const element of array)
      through &&= !!charset[element];

    return through
      ? array.map(x => charset[x]).join('')
      : otherwise(str)
  },

  typefaceNames: [] as string[],

  suprender: (s: string) => Unicode.render_if_forall(Unicode["supscripts"], s, x => '^' + Proper.brace(x)),
  subrender: (s: string) => Unicode.render_if_forall(Unicode["subscripts"], s, x => '_' + Proper.brace(x)),

  supscripts: {} as SMap,
  subscripts: {} as SMap,

  greeks: {} as SMap,
};

Unicode["letterUppers"] = Unicode.series('A', 'Z');
Unicode["letterLowers"] = Unicode.series('a', 'z');
Unicode["letters"] = Unicode["letterUppers"] + Unicode["letterLowers"];
Unicode["letterArray"] = Array.from(Unicode["letters"]);

Unicode["greekUppers"] = Unicode.series('Α', 'Ρ') + Unicode.series('Σ', 'Ω')
Unicode["greekLowers"] = Unicode.series('α', 'ρ') + Unicode.series('σ', 'ω')
Unicode["greeks"] = Unicode["greekUppers"] + Unicode["greekLowers"];


// typeface (Mathematical Alphanumeric Symbols)
const series = Unicode.series;
const alphabets = Unicode.alphabets;

const typeface = function (name: string, alphabet: SMap) {
  Unicode.typeface[name] = alphabet;
}

typeface('mathbb', alphabets(...'𝔸𝔹ℂ', ...series('𝔻', '𝔾'),
  'ℍ', ...series('𝕀', '𝕄'), ...'ℕ𝕆ℙℚℝ', ...series('𝕊', '𝕐'),
  'ℤ', ...series('𝕒', '𝕫'))
)
typeface('mathfrak', alphabets(...series('𝕬', '𝖟')))
typeface('mathscr', alphabets(...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ', ...series('𝒩', '𝒬'),
  'ℛ', ...series('𝒮', '𝒹'), 'ℯ', '𝒻', 'g', ...series('𝒽', '𝓃'),
  'ℴ', ...series('𝓅', '𝓏'))
)
typeface('mathcal', Unicode.typeface["mathscr"]); // remark
typeface('mathbf', alphabets(...series('𝐀', '𝐳')));
typeface('mathit', alphabets(...series('𝐴', '𝑔'), 'h', ...series('𝑖', '𝑧')));
typeface('mathsf', alphabets(...series('𝖠', '𝗓')));

typeface('textbf', Unicode.typeface.mathbf);
typeface('textit', Unicode.typeface.mathit);
typeface('textsf', Unicode.typeface.mathsf);
typeface('texttt', alphabets(...series('𝙰', '𝚣')));

typeface('textscr', Unicode.typeface.mathscr); // original
typeface('textcal', Unicode.typeface.mathcal); // original

typeface('sf', Unicode.typeface.mathsf);
typeface('bf', Unicode.typeface.mathbf);
typeface('bold', Unicode.typeface.mathbf);

typeface('boldsymbol', Unicode.typeface.mathbf);
typeface('bm', Unicode.typeface.mathbf);

typeface('tt', Unicode.typeface.texttt);
typeface('it', Unicode.typeface.mathit);

typeface('frak', Unicode.typeface.mathfrak);
typeface('cal', Unicode.typeface.mathcal);

typeface('Bbb', Unicode.typeface.mathbb);
// typeface('text', alphabets(...series('A', 'Z'), ...series('a', 'z')));

Unicode.typefaceNames = Object.keys(Unicode.typeface);

// supscript & subscript

Unicode.supscripts[0] = '⁰';
Unicode.supscripts[1] = '¹';
Unicode.supscripts[2] = '²';
Unicode.supscripts[3] = '³'; // u00b3
Unicode.supscripts[4] = '⁴';
Unicode.supscripts[5] = '⁵';
Unicode.supscripts[6] = '⁶';
Unicode.supscripts[7] = '⁷';
Unicode.supscripts[8] = '⁸';
Unicode.supscripts[9] = '⁹';

Unicode.supscripts.a = 'ᵃ';
Unicode.supscripts.b = 'ᵇ';
Unicode.supscripts.c = 'ᶜ';
Unicode.supscripts.d = 'ᵈ';
Unicode.supscripts.e = 'ᵉ';
Unicode.supscripts.f = 'ᶠ';
Unicode.supscripts.g = 'ᵍ';
Unicode.supscripts.h = 'ʰ';
// Unicode.supscripts.i = '^i'
Unicode.supscripts.j = 'ʲ';
Unicode.supscripts.k = 'ᵏ';
Unicode.supscripts.l = 'ˡ';
Unicode.supscripts.m = 'ᵐ';
Unicode.supscripts.n = 'ⁿ'; // u207f
Unicode.supscripts.o = 'ᵒ';
Unicode.supscripts.p = 'ᵖ';
Unicode.supscripts.r = 'ʳ';
Unicode.supscripts.s = 'ˢ';
Unicode.supscripts.t = 'ᵗ';
Unicode.supscripts.u = 'ᵘ';
Unicode.supscripts.v = 'ᵛ';
Unicode.supscripts.w = 'ʷ';
Unicode.supscripts.x = 'ˣ'; // u02e3
Unicode.supscripts.y = 'ʸ';
Unicode.supscripts.z = 'ᶻ';

Unicode.supscripts['+'] = '⁺';
Unicode.supscripts['-'] = '⁻';
Unicode.supscripts['='] = '⁼';
Unicode.supscripts['('] = '⁽';
Unicode.supscripts[')'] = '⁾';

// Unicode: Phonetic Extensions
Unicode.supscripts.A = 'ᴬ';
// Unicode.supscripts. = 'ᴭ'
Unicode.supscripts.B = 'ᴮ';
// Unicode.supscripts. = 'ᴯ';
Unicode.supscripts.D = 'ᴰ';
Unicode.supscripts.E = 'ᴱ';
// Unicode.supscripts. = 'ᴲ';
Unicode.supscripts.G = 'ᴳ';
Unicode.supscripts.H = 'ᴴ';
Unicode.supscripts.I = 'ᴵ';
Unicode.supscripts.J = 'ᴶ';
Unicode.supscripts.K = 'ᴷ';
Unicode.supscripts.L = 'ᴸ';
Unicode.supscripts.M = 'ᴹ';
Unicode.supscripts.N = 'ᴺ';
// Unicode.supscripts. = 'ᴻ';
Unicode.supscripts['α'] = 'ᵅ';
Unicode.supscripts['′'] = '′';


// subscripts

['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
  .forEach((x, i) => Unicode.subscripts[i] = x);

Unicode.subscripts.a = 'ₐ';
Unicode.subscripts.e = 'ₑ';
Unicode.subscripts.h = 'ₕ';
Unicode.subscripts.i = 'ᵢ'; // u1d62
Unicode.subscripts.j = 'ⱼ';
Unicode.subscripts.k = 'ₖ';
Unicode.subscripts.l = 'ₗ';
Unicode.subscripts.m = 'ₘ';
Unicode.subscripts.n = 'ₙ';
Unicode.subscripts.o = 'ₒ';
Unicode.subscripts.p = 'ₚ'; // u209a
Unicode.subscripts.r = 'ᵣ';
Unicode.subscripts.s = 'ₛ';
Unicode.subscripts.t = 'ₜ';
Unicode.subscripts.u = 'ᵤ';
Unicode.subscripts.v = 'ᵥ';
Unicode.subscripts.x = 'ₓ';

Unicode.subscripts['+'] = '₊';
Unicode.subscripts['-'] = '₋';
Unicode.subscripts['='] = '₌';
Unicode.subscripts['('] = '₍';
Unicode.subscripts[')'] = '₎';

export default Unicode;

