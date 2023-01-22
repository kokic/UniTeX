

import { proxy, link } from './utils/link.js'

// Parse<A>.parse: String -> [A, String]
const Parser = function (parse) {
  this.parse = parse
}

export default Parser

Parser.prototype.many = function () {
  return new Parser(source => {
    let [list, residue, tuple] = [[], source]
    while (tuple = this.parse(residue)) {
      list.push(tuple[0])
      residue = tuple[1]
    }
    return [list, residue]
  })
}

Parser.prototype.some = function () {
  return new Parser(source => {
    let tuple = this.many().parse(source)
    return tuple[0].length >= 1 ? tuple : undefined
  })
}

Parser.prototype.asterisk = function () {
  return new Parser(source => {
    let [buffer, residue, tuple] = ['', source,]
    while (tuple = this.parse(residue)) {
      buffer += tuple[0]
      residue = tuple[1]
    }
    return [buffer, residue]
  })
}

Parser.prototype.plus = function () {
  return new Parser(source => {
    let tuple = this.asterisk().parse(source)
    return tuple[0].length >= 1 ? tuple : undefined
  })
}



/*
 *  tuple? -> [a, residue]
 *         -> [morph a, residue]
 */
Parser.prototype.map = function (morph) {
  return new Parser(source =>
    link(() => this.parse(source))
      .map(xs => [morph(xs[0]), xs[1]])
      .exec()
  )
}

Parser.prototype.first = proxy(x => x.map(tuple => tuple[0]))
Parser.prototype.second = proxy(x => x.map(tuple => tuple[1]))


Function.prototype.parse = proxy((x, s) => x().parse(s))

/*
 *  tuple1? -> [a, phase1]                 (check)
 *          -> [[a, phase1], tuple2?]      (glue )
 *          -> [[a, phase1], [b, phase2]]  (check)
 *          -> [[a, b], phase2]
 */
Parser.prototype.follow = function (next) {
  return new Parser(source =>
    link(() => this.parse(source))
      .glue(link(xs => next.parse(xs[1])))
      .map(xs => [[xs[0][0], xs[1][0]], xs[1][1]])
      .exec()
  )
}

/*
 *  tuple1? -> [a, phase1]                 (check)
 *          -> [[a, phase1], tuple2?]      (glue )
 *          -> [[a, phase1], [b, phase2]]  (check)
 *          -> [a, phase2]
 */
Parser.prototype.skip = function (next) {
  return new Parser(source =>
    link(() => this.parse(source))
      .glue(link(xs => next.parse(xs[1])))
      .map(xs => [xs[0][0], xs[1][1]])
      .exec()
  )
}

/*
 *  tuple? -> [a, residue]
 *         -> [a, residue] (check predicate)
 */
Parser.prototype.check = function (predicate) {
  return new Parser(source => 
    link(() => this.parse(source))
      .check(x => predicate(...x))
      .exec()
  )
}

/*
 *  tuple1? -> tuple1 (check)
 *        ! -> tuple2
 */
Parser.prototype.or = function (next) {
  return new Parser(source =>
    this.parse(source) || next.parse(source)
  )
}
