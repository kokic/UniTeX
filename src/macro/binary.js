
import Block from '../utils/block.js'
import Proper from '../utils/proper.js'
import Fixed from './fixed.js'

const oversetEquationMap = {
  '?=': Fixed.qeq,
  'm=': Fixed.meq,
  'def=': Fixed.defeq, 

  // from unimath, wait hook style
  [Fixed['star'] + '=']: Fixed['stareq'],
  [Fixed['Delta'] + '=']: Fixed['deltaeq'],
};

const Binary = {

  frac: (x, y) => `${Proper.paren(x)}/${Proper.paren(y)}`,
  overset: (x, y) => oversetEquationMap[`${x}${y}`] || `\\overset{${x}}{${y}}`,
  binom: (n, k) => `(${n} ${k})`,

  /* unstable */
  alias: (a, x) => (Fixed[a] = x, '')
}

const BinaryBlock = {
  frac: (x, y) => Block.frac(x, y),
  overset: (x, y) => Binary.overset(x.string, y.string).toBlock()
}

const BinaryInfix = {
  choose: (n, k) => Binary.binom(n, k)
}

Binary['cfrac'] = Binary.frac
Binary['dfrac'] = Binary.frac
Binary['tfrac'] = Binary.frac

Binary['dbinom'] = Binary.binom
Binary['tbinom'] = Binary.binom

BinaryBlock['cfrac'] = BinaryBlock.frac
BinaryBlock['dfrac'] = BinaryBlock.frac
BinaryBlock['tfrac'] = BinaryBlock.frac

export default Binary
export { BinaryBlock, BinaryInfix }
