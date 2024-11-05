import { createTranslator } from "../cli";

import Proper from "./unicode/proper";
import Fixed from "./typst/fixed";

type Block = string;

// https://github.com/typst/typst/blob/main/crates/typst/src/symbols/sym.rs
// https://ray0427.medium.com/using-git-url-as-npm-dependencies-and-semantic-versioning-82b27a3245a5

export const translate = createTranslator<Block>({
  fixed: Fixed, 
  unary: {
    text: (s: string) => `"${s}"`,
    sqrt: (s: string) => `sqrt(${s})`, 
    mathbf: (s: string) => `mathbf(${s})`, 
  }, 
  unaryOptional: {
    sqrt: (n: string, x: string) => `root(${n}, ${x})`,
  }, 
  binary: {
    frac: (p, q) => `${Proper.paren(p)}/${Proper.paren(q)}`, 
    binom: (n, m) => `binom(${n} ${m})`,
  }, 
  emptyBlock: "", 
  createBlock: (a: string) => `$ ${a} $`,
  concatBlock: (a: Block, b: Block) => a + b,
  displayBlock: (a: Block) => a,
  subscriptHandler: (s: string) => `_${Proper.paren(s)}`,
  supscriptHandler: (s: string) => `^${Proper.paren(s)}`,
  typefaceHandler: (s: string, typeface: string) => s, 
  inlineMathHandler: (s: string) => `$${s}$`,
});
