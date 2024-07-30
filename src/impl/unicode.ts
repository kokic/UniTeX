import { createTranslator } from "../cli";

import Fixed, { FixedInfixes } from "./unicode/fixed";
import Unary, { UnaryOptional, UnaryTypefaceNames } from "./unicode/unary";
import Binary, { BinaryBlock, BinaryInfix } from "./unicode/binary";
import Environment from "./unicode/environment";
import Block from "./unicode/block";
import Unicode from "./unicode/unicode-table";

export const translate = createTranslator<Block>({
  fixed: Fixed, 
  fixedInfixes: FixedInfixes, 
  unary: Unary, 
  unaryOptional: UnaryOptional, 
  unaryTypefaceNames: UnaryTypefaceNames, 
  binary: Binary, 
  binaryInfix: BinaryInfix, 
  binaryBlock: BinaryBlock, 
  environment: Environment, 
  emptyBlock: Block.empty, 
  createBlock: Block.of, 
  concatBlock: (a: Block, b: Block) => a.append(b), 
  displayBlock: (a: Block) => a.display, 
  subscriptHandler: Unicode.subrender, 
  supscriptHandler: Unicode.suprender, 
  typefaceHandler: Unicode.render_if_exists
});
