
import { type Binary, type BinaryBlock } from '../../cli.ts';

import Block from './block.ts';
import Proper from './proper.ts';
import Fixed from './fixed.ts';

const oversetEquationMap = {
  '?=': Fixed.qeq,
  'm=': Fixed.meq,
  'def=': Fixed.defeq, 

  // from unimath, wait hook style
  [Fixed['star'] + '=']: Fixed['stareq'],
  [Fixed['Delta'] + '=']: Fixed['deltaeq'],
};

const Binary: Binary = {

  frac: (x, y) => `${Proper.paren(x)}/${Proper.paren(y)}`,
  overset: (x, y) => oversetEquationMap[`${x}${y}`] || `\\overset{${x}}{${y}}`,
  binom: (n, k) => `(${n} ${k})`,

  /* unstable */
  alias: (a, x) => (Fixed[a] = x, '')
};

const BinaryBlock: BinaryBlock<Block> = {
  frac: Block.frac,
  overset: (x: Block, y: Block) => Block.of(Binary.overset(x.display, y.display))
};

const BinaryInfix: Binary = {
  choose: (n, k) => Binary.binom(n, k)
};

Binary['cfrac'] = Binary.frac;
Binary['dfrac'] = Binary.frac;
Binary['tfrac'] = Binary.frac;

Binary['dbinom'] = Binary.binom;
Binary['tbinom'] = Binary.binom;

BinaryBlock['cfrac'] = BinaryBlock.frac;
BinaryBlock['dfrac'] = BinaryBlock.frac;
BinaryBlock['tfrac'] = BinaryBlock.frac;

export default Binary;

export { BinaryBlock, BinaryInfix };
