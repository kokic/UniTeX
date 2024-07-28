
const shouldWrap = (x: string) => x.charAt(0) == '-'
  ? shouldWrap(x.substring(1))
  : x.length <= 1;

namespace Proper {
  
  export const wrap = (ls: string, rs: string) => 
    (x: string) => shouldWrap(x) ? x : `${ls}${x}${rs}`;

  export const paren = Proper.wrap('(', ')');
  export const bracket = Proper.wrap('[', ']');
  export const brace = Proper.wrap('{', '}');
}

export default Proper;
