
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
  }, 

  block: function(a, b, names) {
    let map = new Object()
    let data = Unicode.series(a, b)
    names.forEach((name, i) => name && (map[name] = data[i]))
    return map
  }, 

  render: (s, name) => Array.from(s).map(x => Unicode[name][x] || x).join(''), 
}

Unicode.letterUppers = Unicode.series('A', 'Z')
Unicode.letterLowers = Unicode.series('a', 'z')
Unicode.letters = Unicode.letterUppers + Unicode.letterLowers
Unicode.letterArray = Array.from(Unicode.letters)

Unicode.greekUppers = Unicode.series('Α', 'Ρ') + Unicode.series('Σ', 'Ω')
Unicode.greekLowers = Unicode.series('α', 'ρ') + Unicode.series('σ', 'ω')
Unicode.greeks = Unicode.greekUppers + Unicode.greekLowers

Unicode.supscripts = Unicode.block('ᵃ', 'ᵡ', [
  'a', 
  'ɐ', 
  'α', 
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
Unicode.supscripts.n = 'ⁿ' // u207f

Unicode.subscripts = {}
Unicode.subscripts.p = 'ₚ' // u209a

console.log(Unicode.supscripts)

export default Unicode
