
const singloid = x => x.charAt() == '-'
  ? singloid(x.substring(1))
  : x.length <= 1

const Proper = new Object()
Proper.wrap = (ls, rs) => x => singloid(x) ? x : ls + x + rs
Proper.paren = Proper.wrap('(', ')')
Proper.bracket = Proper.wrap('[', ']')
Proper.brace = Proper.wrap('{', '}')

export default Proper