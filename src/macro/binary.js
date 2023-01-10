
import Proper from '../utils/proper.js'

const Binary = {
  frac: (x, y) => `${Proper.paren(x)}/${Proper.paren(y)}`
}
Binary['cfrac'] = Binary.frac
Binary['dfrac'] = Binary.frac
Binary['tfrac'] = Binary.frac

export default Binary
