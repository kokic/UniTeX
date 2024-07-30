/**
 * CLI - Common LaTeX Implements
 */

export type Fixed = {
  [key: string]: string;
};

export type Unary = {
  [key: string]: (x: string) => string
};

export type UnaryOptional = {
  [key: string]: (s: string, t: string) => string
};

export type Binary = {
  [key: string]: (x: string, y: string) => string
};

export type BinaryBlock<Block> = {
  [key: string]: (x: Block, y: Block) => Block;
};

export type Environment = {
  [key: string]: (s: string) => string
};


import {
  character,
  digit,
  includes,
  loose,
  letter,
  letters,
  string,
  token,
} from './parsec/collection.ts';

import { Parser } from './parsec/combinator.ts';
import { Lazy, of } from './parsec/lazy.ts';
import "./parsec/declare-global.ts";

const backslash = character('\\');

const lbrace = character('{');
const rbrace = character('}');
const brace_wrap = <α>(p: Parser<α> | Lazy<Parser<α>>) => lbrace.move(p).skip(rbrace);

const lbracket = character('[');
const rbracket = character(']');
const bracket_wrap = <α>(p: Parser<α>) => lbracket.move(p).skip(rbracket);

const special = (s: string) => '\\{}_^%$'.includes(s);
// const unit = digit.skip(string('em'))

const literal = token(x => !special(x));
const literals = literal.plus();

const solid = (s: string) => s.trim().length == 1;
const valuesymbol = literal.assume(solid);

export const createTranslator = <Block>({
  fixed = {}, 
  fixedInfixes = [], 
  unary = {}, 
  unaryOptional = {}, 
  unaryTypefaceNames = [], 
  binary = {}, 
  binaryInfix = {}, 
  binaryBlock = {}, 
  environment = {}, 
  emptyBlock, 
  createBlock, 
  concatBlock, 
  displayBlock, 
  subscriptHandler, 
  supscriptHandler, 
  typefaceHandler
}: {
  fixed?: Fixed,
  fixedInfixes?: string[],
  unary?: Unary,
  unaryOptional?: UnaryOptional,
  unaryTypefaceNames?: string[],
  binary?: Binary,
  binaryInfix?: Binary,
  binaryBlock?: BinaryBlock<Block>,
  environment?: Environment,
  emptyBlock: Block, 
  createBlock: (s: string) => Block, 
  concatBlock: (s: Block, t: Block) => Block, 
  displayBlock: (b: Block) => string, 
  subscriptHandler: (s: string) => string, 
  supscriptHandler: (s: string) => string, 
  typefaceHandler: (typeface: string, s: string) => string, 
}) => {
  const single = digit.or(letter).or(valuesymbol).or(of(() => fixed_macro));
  const value = loose(single.or(brace_wrap(of(() => text))));
  const optional = bracket_wrap(value); // [value]

  const symbol_macros = includes(...'|,>:;!()[]{}_%\\`^~=."\'');

  const macro_name = letters.or(symbol_macros)
  const macro_head = backslash.move(macro_name);

  const fixed_macro = macro_head.assume(x => x in fixed)
    .map(s => fixed[s]);

  const unary_ordinary_macro = macro_head.assume(x => x in unary)
    .follow(value)
    .map(([name, arg1]) => unary[name](arg1))

  const unary_optional_macro = macro_head.assume(x => !!unaryOptional[x])
    .follow2(optional, value)
    .map(([[name, opt1], arg1]) => unaryOptional[name](opt1, arg1))

  const unary_macro = unary_optional_macro.or(unary_ordinary_macro);

  const binary_macro = macro_head.assume(x => !!binary[x])
    .follow2(value, value)
    .map(([[name, arg1], arg2]) => binary[name](arg1, arg2));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const infix_macro = value
    .follow(macro_head.assume(x => !!binaryInfix[x]))
    .follow(value)
    .map(xs => binary[xs[0][1]](xs[0][0], xs[1]));


  const braced_letters = brace_wrap(letters)
  const begin = backslash.skip(string('begin')).move(braced_letters)
  const end = backslash.skip(string('end')).move(braced_letters)
  // [[begin, text], end]
  const environ = begin.follow(of(() => section)).follow(end)
    .assume(xs => xs[0][0] == xs[1])
    .map(xs => environment[xs[1]](xs[0][1]))
  //


  const supscript = character('^').move(value).map(supscriptHandler);
  const subscript = character('_').move(value).map(subscriptHandler);
  const sup_or_sub = supscript.or(subscript);

  const comment = character('%')
    .skip(token(x => x != '\n').asterisk())
    .skip(character('\n'))
    .map(() => '');

  const typeface = macro_head.assume(x => unaryTypefaceNames.includes(x))
    .follow(value)
    .map(([name, arg1]) => unary[name](arg1));
  //

  // inline
  const inline_elem = literals
    // .or(infixMacro)
    .or(sup_or_sub)
    .or(environ)
    .or(unary_macro)
    .or(binary_macro)
    .or(value)

  const italic_render = (s: string) => typefaceHandler("mathit", s);
  // Unicode.render_if_exists(s, 'mathit');

  const inline_cluster = typeface
    // .or(fixedMacro)
    .or(inline_elem.map(italic_render))
    .plus();

  const dollar = character('$')
  const inline_math = dollar.move(inline_cluster).skip(dollar);




  // block
  const block_infix = token(x => '+-*/<>~'.includes(x))
    .or(macro_head.assume(x => fixedInfixes.includes(x)).map(x => fixed[x]))
    .map(s => createBlock(` ${s} `));

  const block_value = loose(
    single
      .map(createBlock)
      .or(brace_wrap(of(() => block_cluster)))
  );

  const block_binary_macro = macro_head.assume(x => !!binaryBlock[x])
    .follow2(block_value, block_value)
    .map(xs => binaryBlock[xs[0][0]](xs[0][1], xs[1]));

  const block_elem: Parser<Block> = loose(block_infix)
    .or(block_value) // csp. value
    .or(sup_or_sub.map(createBlock))
    .or(fixed_macro.map(createBlock))
    .or(unary_macro.map(createBlock))
    .or(block_binary_macro) // csp. binary
    .or(token(x => !solid(x)).some().map(_ => emptyBlock));

  const block_cluster = block_elem.some()
    .map(xs => xs.reduce(concatBlock));

  const double_dollar = string('$$')
  const block_math = double_dollar
    .move(block_cluster.map(displayBlock))
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

  const translate = (s: string) =>
    (x => x.type != "error" ? x.res : "")
      (text.parse(s.toIterator()));

  return translate;
};
