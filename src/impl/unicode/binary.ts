
import { type Binary, type BinaryBlock } from '../../macro-types.ts';

import Block from './block.ts';
import Proper from './proper.ts';

export const oversetLookup: {
  [key: string]: string;
} = {};

const Binary: Binary = {
  frac: (x, y) => `${Proper.paren(x)}/${Proper.paren(y)}`,
  overset: (x, y) => oversetLookup[`${x}${y}`] || `\\overset{${x}}{${y}}`,
  binom: (n, k) => `(${n} ${k})`,
};

Binary['cfrac'] = Binary.frac;
Binary['dfrac'] = Binary.frac;
Binary['tfrac'] = Binary.frac;

Binary['dbinom'] = Binary.binom;
Binary['tbinom'] = Binary.binom;

const BinaryBlock: BinaryBlock<Block> = {
  frac: Block.frac,
  overset: (x: Block, y: Block) => Block.of(Binary.overset(x.display, y.display))
};

const BinaryInfix: Binary = {
  choose: (n, k) => Binary.binom(n, k)
};

BinaryBlock['cfrac'] = BinaryBlock.frac;
BinaryBlock['dfrac'] = BinaryBlock.frac;
BinaryBlock['tfrac'] = BinaryBlock.frac;

export { Binary, BinaryInfix, BinaryBlock };
