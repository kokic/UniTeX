
// import { parse } from "../../../unitex.js";

export const hyper = {

  title: 'hyper',
  description: 'text processor extension',

  unary: {
    length: s => s.length, 
    lower: s => s.toLowerCase(), 
    upper: s => s.toUpperCase(), 
  }, 

  binary: {
    repeat: (s, n) => s.repeat(n),
    // for: (s, n) => [...Array(parseInt(n)).keys()]
    //   .map(x => parse(s.replace(/#(\d+)/g, (__, n) => x + + n)))
    //   .reduce((x, y) => x + y)
  }

}