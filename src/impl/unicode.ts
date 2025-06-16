import { createTranslator } from "../cli";

import Fixed, { FixedInfixes } from "./unicode/fixed";
import Unary, { UnaryOptional, UnaryTypefaceNames } from "./unicode/unary";
import { Binary, BinaryInfix, BinaryBlock, oversetLookup } from "./unicode/binary";
import Environment from "./unicode/environment";
import Block from "./unicode/block";
import Unicode from "./unicode/unicode-table";

import FixedBanner from "./x/fixed-banner";
import FixedTheorem from "./x/fixed-theorem";
import { FixedUnicodeMath, UnicodeMathOversetLookup } from "./x/unicode-math";

Object.assign(Fixed, FixedBanner, FixedTheorem, FixedUnicodeMath);
Object.assign(oversetLookup, UnicodeMathOversetLookup);

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

export {
  Binary, BinaryInfix, BinaryBlock
};