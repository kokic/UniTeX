
import Context from '../context/context.js'
import Proper from '../utils/proper.js'
import Unicode from '../utils/unicode.js'

const Unary = {
  id: x => x,
  text: x => x, 
  mathrm: x => x, 

  sqrt: x => '√' + Proper.paren(x),
  cbrt: x => '∛' + Proper.paren(x), // original
  furt: x => '∜' + Proper.paren(x), // original

  grave: x => x + (Unicode.isLetter(x) ? '\u0300' : '-grave'),
  '`': x => x + (Unicode.isLetter(x) ? '\u0300' : ''),

  acute: x => x + (Unicode.isLetter(x) ? '\u0301' : '-acute'),
  '\'': x => x + (Unicode.isLetter(x) ? '\u0301' : ''),
  
  hat: x => x + (Unicode.isLetter(x) ? '\u0302' : '-hat'),
  '^': x => x + (Unicode.isLetter(x) ? '\u0302' : ''),
  
  tilde: x => x + (Unicode.isLetter(x) ? '\u0303' : '-tilde'),
  '~': x => x + (Unicode.isLetter(x) ? '\u0303' : ''),

  bar: x => x + (Unicode.isLetter(x) ? '\u0304' : '-bar'),
  '=': x => x + (Unicode.isLetter(x) ? '\u0304' : ''),
  
  overline: x => x + (Unicode.isLetter(x) ? '\u0305' : '-underline'),
  breve: x => x + (Unicode.isLetter(x) ? '\u0306' : '-breve'),
  u: x => x + (Unicode.isLetter(x) ? '\u0306' : ''),

  '.': x => x + (Unicode.isLetter(x) ? '\u0307' : ''),
  '"': x => x + (Unicode.isLetter(x) ? '\u0308' : ''),
  
  
  r: x => x + (Unicode.isLetter(x) ? '\u030A' : ''),
  H: x => x + (Unicode.isLetter(x) ? '\u030B' : ''),
  v: x => x + (Unicode.isLetter(x) ? '\u030C' : ''),


  kern: x => x.endsWith('em') ? ' '.repeat(x.substring(0, x.length - 2)) : ' ',

  __optional__: {
    sqrt: (n, x) =>
      n == 2 ? Unary.sqrt(x) :
        n == 3 ? Unary.cbrt(x) :
          n == 4 ? Unary.furt(x) :
            Unicode.suprender(n) + Unary.sqrt(x), 
  }, 

  usecontext: x => (Context.use(x), '')
}
Unary.mkern = Unary.kern
Unary.mskip = Unary.kern
Unary.hskip = Unary.kern
Unary.hspace = Unary.kern

Unicode.typefaceNames.forEach(x => Unary[x] = s => Unicode.render(s, x))

/* just for typeface: Parser */
Unary.typefaceNames = ['text', 'mathrm', ...Unicode.typefaceNames]

export default Unary
