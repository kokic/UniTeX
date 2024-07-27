
const should_wrap = x => x.charAt() == '-'
  ? should_wrap(x.substring(1))
  : x.length <= 1;

const Proper = {};

Proper.wrap = (ls, rs) => x => should_wrap(x) ? x : `${ls}${x}${rs}`;

Proper.paren = Proper.wrap('(', ')');
Proper.bracket = Proper.wrap('[', ']');
Proper.brace = Proper.wrap('{', '}');

export default Proper