
import Proper from '../utils/proper.js'
import Unicode from '../utils/unicode.js'

const Unary = {
  id: x => x,
  text: x => x, 

  sqrt: x => '√' + Proper.paren(x),
  cbrt: x => '∛' + Proper.paren(x), // original
  furt: x => '∜' + Proper.paren(x), // original

  hat: x => x + (Unicode.isLetter(x) ? '\u0302' : '-hat'),
  tilde: x => x + (Unicode.isLetter(x) ? '\u0303' : '-tilde'),
  bar: x => x + (Unicode.isLetter(x) ? '\u0304' : '-bar'),
  overline: x => x,
  breve: x => x + (Unicode.isLetter(x) ? '\u0306' : '-breve'),

  kern: x => x.endsWith('em') ? ' '.repeat(x.substring(0, x.length - 2)) : ' ',

  __optional__: {
    sqrt: (n, x) =>
      n == 2 ? Unary.sqrt(x) :
        n == 3 ? Unary.cbrt(x) :
          n == 4 ? Unary.furt(x) :
            Unicode.suprender(n) + Unary.sqrt(x), 
  }
}
Unary.mkern = Unary.kern
Unary.mskip = Unary.kern
Unary.hskip = Unary.kern
Unary.hspace = Unary.kern

Unicode.typefaceNames.forEach(x => Unary[x] = s => Unicode.render(s, x))

/* just for typeface: Parser */
Unary.typefaceNames = ['text', ...Unicode.typefaceNames]

export default Unary
