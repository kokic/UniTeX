
const Proper = new Object()
Proper.wrap = (ls, rs) => x => x.length > 1 ? ls + x + rs : x
Proper.paren = Proper.wrap('(', ')')
Proper.bracket = Proper.wrap('[', ']')
Proper.brace = Proper.wrap('{', '}')

export default Proper