

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

// let tuple = this.parse(source)
// if (!tuple) return undefined

// let [a, residue] = tuple
// return [morph(a), residue]

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

//  -> [a, phase1, b, phase2]      (flat )
// flat version: ((a, _, b, s) => [[a, b], s])(...xs.flat())

// let link1 = new Link(() => this.parse(source)).check()
// let link2 = new Link(xs => next.parse(xs[1])).check()
// let morph = xs => xs && ((a, _, b, s) => [[a, b], s])(...xs.flat())

// let tuple1 = this.parse(source)
// if (!tuple1) return undefined

// let [a, phase1] = tuple1

// let tuple2 = next.parse(phase1)
// if (!tuple2) return undefined

// let [b, phase2] = tuple2
// return [[a, b], phase2]


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

// let tuple1 = this.parse(source)
// if (!tuple1) return undefined

// let [a, phase1] = tuple1
// let tuple2 = next.get().parse(phase1)
// if (!tuple2) return undefined

// let [, phase2] = tuple2
// return [a, phase2]




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
// let tuple1 = this.parse(source)
// if (!tuple1) return undefined

// let [a, phase1] = tuple1
// if (!predicate(a, phase1)) return undefined
// return tuple1


/*
 *  tuple1? -> tuple1 (check)
 *        ! -> tuple2
 */
Parser.prototype.or = function (next) {
  return new Parser(source =>
    this.parse(source) || next.parse(source)
  )
}

// let tuple = this.parse(source)
// if (tuple) return tuple
// return next.get().parse(source)
