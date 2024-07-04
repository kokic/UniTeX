
import Unicode from './src/utils/unicode.js'

import Binary, { BinaryBlock, BinaryInfix } from './src/macro/binary.js'
import Unary, { UnaryOptional } from './src/macro/unary.js'
import Fixed from './src/macro/fixed.js'
import Environment from './src/macro/environment.js'
import Block from './src/utils/block.js'

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

import Context from './src/context/context.js'

const backslash = character('\\');

const lbrace = character('{');
const rbrace = character('}');
const brace_wrap = x => lbrace.move(x).skip(rbrace);

const lbracket = character('[');
const rbracket = character(']');
const bracket_wrap = x => lbracket.move(x).skip(rbracket);

const special = x => '\\{}_^%$'.includes(x)
// const unit = digit.skip(string('em'))

const literal = token(x => !special(x))
const literals = literal.plus()

const solid = x => x.trim().length == 1;
const valuesymbol = literal.check(solid);
const single = digit.or(letter).or(valuesymbol).or(() => fixed_macro);
const value = loose(single.or(brace_wrap(() => text)));
const optional = bracket_wrap(value); // [value]

const symbol_macros = includes(...'|,>:;!()[]{}_%\\`^~=."\'')

const macro_name = letters.or(symbol_macros)
const macro_head = backslash.move(macro_name)

const fixed_macro = macro_head.check(x => Fixed[x] != undefined)
  .map(x => Fixed[x])

// [macro, value]
const unary_ordinary_macro = macro_head.check(x => Unary[x])
  .follow(value)
  .map(([name, arg1]) => Unary[name](arg1))

// [[marco, optional], value]
const unary_optional_macro = macro_head.check(x => UnaryOptional[x])
  .follows(optional, value)
  .map(([[name, opt1], arg1]) => UnaryOptional[name](opt1, arg1))

const unary_macro = unary_optional_macro.or(unary_ordinary_macro)

// [[macro, value1], value2]
const binary_macro = macro_head.check(x => Binary[x])
  .follows(value, value)
  .map(([[name, arg1], arg2]) => Binary[name](arg1, arg2))

// [[value1, macro], value2]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const infix_macro = value
  .follow(macro_head.check(x => BinaryInfix[x]))
  .follow(value)
  .map(xs => Binary[xs[0][1]](xs[0][0], xs[1]))


const braced_letters = brace_wrap(letters)
const begin = backslash.skip(string('begin')).move(braced_letters)
const end = backslash.skip(string('end')).move(braced_letters)
// [[begin, text], end]
const environ = begin.follow(() => section).follow(end)
  .check(xs => xs[0][0] == xs[1])
  .map(xs => Environment[xs[1]](xs[0][1]))
//


const supscript = character('^').move(value)
  .map(Unicode.suprender);

const subscript = character('_').move(value)
  .map(Unicode.subrender);

const suporsub = supscript.or(subscript);

const comment = character('%')
  .skip(token(x => x != '\n').asterisk())
  .skip(character('\n'))
  .map(() => '');
//


const typeface = macro_head.check(x => Unary.typefaceNames.includes(x))
  .follow(value)
  .map((name, arg1) => Unary[name](arg1));
//


// inline
const inline_elem = literals
  // .or(infixMacro)
  .or(suporsub)
  .or(environ)
  .or(unary_macro)
  .or(binary_macro)
  .or(value)

const italic_render = s => Unicode.render_if_exists(s, 'mathit')

const inline_cluster = typeface
  // .or(fixedMacro)
  .or(inline_elem.map(italic_render))
  .plus();

const dollar = character('$')
const inline_math = dollar.move(inline_cluster).skip(dollar)




// block
const block_infix = token(x => '+-*/<>~'.includes(x))
  .or(macro_head.check(x => Fixed.infixs.includes(x)).map(x => Fixed[x]))
  .map(x => ` ${x} `.toBlock());

const block_value = loose(single
  .map(x => x.toBlock())
  .or(brace_wrap(() => block_cluster)));

const block_binary_macro = macro_head.check(x => BinaryBlock[x])
  .follow(block_value, block_value)
  .map(xs => BinaryBlock[xs[0][0]](xs[0][1], xs[1]));

const block_elem = loose(block_infix)
  .or(block_value) // csp. value
  .or(suporsub.map(Block.of))
  .or(fixed_macro.map(Block.of))
  .or(unary_macro.map(Block.of))
  .or(block_binary_macro) // csp. binary
  .or(token(x => !solid(x)).some().map(() => Block.empty));

const block_cluster = block_elem.some()
  .map(x => x.reduce((s, t) => s.append(t)));

const double_dollar = string('$$')
const block_math = double_dollar
  .move(block_cluster.map(x => x.string))
  .skip(double_dollar);
//

const mathstyle = block_math.or(inline_math);

/** 
 * because there is a simplified version of 
 * the theorem style (as fixed macro), it is 
 * necessary to ensure that the environment 
 * takes precedence over those macros. 
 *
 */
const element = literals
  .or(comment)
  .or(mathstyle)
  .or(inline_elem);
//

const double_backslash = string('\\\\');
const section = double_backslash.or(element).plus();

const unknown_macro = macro_head.map(x => '\\' + x);

const spectrum = element.or(unknown_macro);
const text = spectrum.plus();

export const parse = s => (x => x ? x[0] : '')(text.parse(s));
export const fixeds = () => Object.keys(Fixed);
export const unaries = () => Object.keys(Unary);
export const binaries = () => Object.keys(Binary); 
export const getContext = () => Context.getContext();