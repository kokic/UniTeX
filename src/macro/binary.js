
import Block from '../utils/block.js'
import Proper from '../utils/proper.js'
import Fixed from './fixed.js'

const Binary = {
  frac: (x, y) => `${Proper.paren(x)}/${Proper.paren(y)}`,
  overset: function (x, y) {
    if (x == '?' && y == '=') return Fixed.qeq
    if (x == 'm' && y == '=') return Fixed.meq
    if (x == 'def' && y == '=') return Fixed.defeq
    if (x == Fixed['star'] && y == '=') return Fixed.stareq
    if (x == Fixed['Delta'] && y == '=') return Fixed.deltaeq
    return `\\overset\{${x}\}\{${y}\}`
  }, 

  __block__: {
    frac: (x, y) => Block.frac(x, y), 
    overset: (x, y) => Binary.overset(x.string, y.string).toBlock()
  }
}

Binary['cfrac'] = Binary.frac
Binary['dfrac'] = Binary.frac
Binary['tfrac'] = Binary.frac

Binary.__block__['cfrac'] = Binary.__block__.frac
Binary.__block__['dfrac'] = Binary.__block__.frac
Binary.__block__['tfrac'] = Binary.__block__.frac

export default Binary
