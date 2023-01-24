
import Unicode from './src/utils/unicode.js'

import Binary from './src/macro/binary.js'
import Unary from './src/macro/unary.js'
import Fixed from './src/macro/fixed.js'
import Environment from './src/macro/environment.js'

import {
  token,
  character,
  includes,
  string,
  loose, 
  digit, 
  letter,
  letters,
} from './src/parsec.js'

const backslash = character('\\')

const lbrace = character('{')
const rbrace = character('}')
const braceWrap = x => lbrace.move(x).skip(rbrace)

const lbracket = character('[')
const rbracket = character(']')
const bracketWrap = x => lbracket.move(x).skip(rbracket)

const special = x => [...'\\{}_^%$'].includes(x)
// const unit = digit.skip(string('em'))

const valuesymbol = token(x => !special(x))
const single = digit.or(letter).or(valuesymbol).or(() => fixedMacro)
const value = loose(single.or(braceWrap(() => text)))
const optional = bracketWrap(value) // [value]

const symbolMacros = includes(...',>:!()[]{}_%\\')

const macroName = letters.or(symbolMacros)

const macroh = backslash.follow(macroName).second()
const fixedMacro = macroh.check(x => Fixed[x]).map(x => Fixed[x])

// [macro, value]
const unaryOrdinaryMacro = macroh.check(x => Unary[x])
  .follow(value)
  .map(xs => Unary[xs[0]](xs[1]))

// [[marco, optional], value]
const unaryOptionalMacro = macroh.check(x => Unary.__optional__[x])
  .follow(optional)
  .follow(value)
  .map(xs => Unary.__optional__[xs[0][0]](xs[0][1], xs[1]))

const unaryMacro = unaryOrdinaryMacro.or(unaryOptionalMacro)

// [[macro, value1], value2]
const binaryMacro = macroh.check(x => Binary[x])
  .follow(value)
  .follow(value)
  .map(xs => Binary[xs[0][0]](xs[0][1], xs[1]))

const envira = braceWrap(letters)
const begin = backslash.skip(string('begin')).move(envira)
const end = backslash.skip(string('end')).move(envira)
// [[begin, text], end]
const environ = begin.follow(() => section).follow(end)
  .check(xs => xs[0][0] == xs[1])
  .map(xs => Environment[xs[1]](xs[0][1]))
//


const supscript = character('^').move(value)
  .map(Unicode.suprender)
const subscript = character('_').move(value)
  .map(Unicode.subrender)
const suporsub = supscript.or(subscript)

const comment = character('%')
  .skip(token(x => x != '\n').asterisk())
  .skip(character('\n'))
  .map(() => '')

// inline
const mathstyle = character('$')
  .move(() => text)
  .skip(character('$'))
  .map(s => Unicode.render(s, 'mathit'))

/** 
 * because there is a simplified version of 
 * the theorem style (as fixed macro), it is 
 * necessary to ensure that the environment 
 * takes precedence over those macros. 
 *
 */
const element = token(x => !special(x)).plus()
  .or(value)
  .or(comment)
  .or(mathstyle)
  .or(suporsub)
  .or(environ)
  .or(fixedMacro)
  .or(unaryMacro)
  .or(binaryMacro)
//

const doubleBackslash = string('\\\\')
const section = doubleBackslash.or(element).plus()

// console.log(environ.parse(String.raw`\begin{bmatrix} 
//   0 & 1 \\ 
//   1 & 0 
// \end{bmatrix}`))


const unknownMacro = macroh.map(x => '\\' + x)

const text = element.or(unknownMacro).plus()

export const UniTeX = {
  parse: s => (x => x ? x[0] : '')(text.parse(s))
}
