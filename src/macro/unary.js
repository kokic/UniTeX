
import Unicode from '../utils/unicode.js'

const Unary = {
  id: x => x,
  text: x => x,

  hat: x => x + (Unicode.isLetter(x) ? '\u0302' : '-hat'),
  tilde: x => x + (Unicode.isLetter(x) ? '\u0303' : '-tilde'),
  bar: x => x + (Unicode.isLetter(x) ? '\u0304' : '-bar'),
  breve: x => x + (Unicode.isLetter(x) ? '\u0306' : '-breve'),

  kern: x => x.endsWith('em') ? ' '.repeat(x.substring(0, x.length - 2)) : ' ',
}

const typefaceNames = Object.keys(Unicode.typeface)
typefaceNames.forEach(x => Unary[x] = s => Unicode.render(s, x))

export default Unary
