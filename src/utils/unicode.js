
import './prototype.js'

const Unicode = {
  typeface: {},
  isLetter: x => x.boundedIn('a', 'z') || x.boundedIn('A', 'Z'),

  series: function (a, b) {
    let [code1, code2] = [a.code(), b.code()]
    let length = code2 - code1 + 1
    let codes = Array.from({ length: length }, (_, x) => x + code1)
    return String.fromCodePoint(...codes)
  },

  alphabets: function () {
    let map = new Object()
    Unicode.letterArray.forEach((x, i) => map[x] = arguments[i])
    return map
  },

  block: function (a, b, names) {
    let map = new Object()
    let data = Unicode.series(a, b)
    names.forEach((name, i) => name && (map[name] = data[i]))
    return map
  },

  render: (s, name) => Array.from(s)
    .map(x => Unicode.typeface[name][x] || x)
    .join(''),
}

Unicode.letterUppers = Unicode.series('A', 'Z')
Unicode.letterLowers = Unicode.series('a', 'z')
Unicode.letters = Unicode.letterUppers + Unicode.letterLowers
Unicode.letterArray = Array.from(Unicode.letters)

Unicode.greekUppers = Unicode.series('Α', 'Ρ') + Unicode.series('Σ', 'Ω')
Unicode.greekLowers = Unicode.series('α', 'ρ') + Unicode.series('σ', 'ω')
Unicode.greeks = Unicode.greekUppers + Unicode.greekLowers


// typeface
const series = Unicode.series
const alphabets = Unicode.alphabets

const typeface = function (name, alphabet) {
  Unicode.typeface[name] = alphabet
}

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
typeface('textbf', Unicode.typeface.mathbf)



// supscript & subscript

Unicode.supscripts = Unicode.block('ᵃ', 'ᵡ', [
  'a',
  'ɐ',
  'α', // pending
  undefined, // ae
  'b',
  'd',
  'e',
  undefined, // schwa
  undefined, // open e
  undefined, // turned open e
  'g',
  undefined, // turned i
  'k',
  'm',
  undefined, // eng
  'o',
  undefined, // open o
  undefined, // top half o
  undefined, // bottom half o
  'p',
  't',
  'u',
])
Unicode.supscripts.x = 'ˣ' // u02e3
Unicode.supscripts.n = 'ⁿ' // u207f

Unicode.subscripts = {}
Unicode.subscripts.p = 'ₚ' // u209a

// console.log(Unicode.supscripts)

export default Unicode
