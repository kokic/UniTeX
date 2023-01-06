
import './prototype.js'

const Unicode = {
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
  }
}

Unicode.letterUppers = Unicode.series('A', 'Z')
Unicode.letterLowers = Unicode.series('a', 'z')
Unicode.letters = Unicode.letterUppers + Unicode.letterLowers
Unicode.letterArray = Array.from(Unicode.letters)

Unicode.greekUppers = Unicode.series('Α', 'Ρ') + Unicode.series('Σ', 'Ω')
Unicode.greekLowers = Unicode.series('α', 'ρ') + Unicode.series('σ', 'ω')
Unicode.greeks = Unicode.greekUppers + Unicode.greekLowers

export default Unicode
