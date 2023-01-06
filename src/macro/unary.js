
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

export default Unary

const typeface = function (name, data) {
  Unicode[name] = data
  Unary[name] = s => Array.from(s)
    .map(x => Unicode[name][x] || x)
    .join('')
}

const { series, alphabets } = Unicode

typeface('mathbb', alphabets(...'𝔸𝔹ℂ', ...series('𝔻', '𝔾'),
  'ℍ', ...series('𝕀', '𝕄'), ...'ℕ𝕆ℙℚℝ', ...series('𝕊', '𝕐'),
  'ℤ', ...series('𝕒', '𝕫'))
)
typeface('mathfrak', alphabets(...series('𝕬', '𝖟')))
typeface('mathscr', alphabets('𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ', ...series('𝒩', '𝒬'),
  'ℛ', ...series('𝒮', '𝒹'), 'ℯ', '𝒻', 'g', ...series('𝒽', '𝓃'),
  'ℴ', ...series('𝓅', '𝓏'))
)
typeface('mathbf', alphabets(...series('𝐀', '𝐳')))

typeface('textit', alphabets(...series('𝐴', '𝑔'), 'h', ...series('𝑖', '𝑧')))
typeface('textsf', alphabets(...series('𝖠', '𝗓')))
typeface('texttt', alphabets(...series('𝙰', '𝚣')))
typeface('textbf', alphabets(...series('𝐀', '𝐳')))

