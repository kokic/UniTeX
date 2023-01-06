

const Proper = new Object()
Proper.wrap = (ls, rs) => x => x.length > 1 ? ls + x + rs : x
Proper.brace = Proper.wrap('(', ')')

const Binary = {
  frac: (x, y) => `${Proper.brace(x)}/${Proper.brace(y)}`
}
Binary['cfrac'] = Binary.frac
Binary['dfrac'] = Binary.frac
Binary['tfrac'] = Binary.frac

export default Binary
