
import { proxy, link } from './utils/link.js'

// Parse<A>.parse: String -> [A, String]
const Parser = function (parse) {
  this.parse = parse
}
Parser.create = parse => new Parser(parse)

export default Parser

Parser.prototype.many = function () {
  return new Parser(source => {
    let [list, residue, tuple] = [[], source]
    // eslint-disable-next-line no-cond-assign
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
    // eslint-disable-next-line no-cond-assign
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
      .run()
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
      .pip(link(xs => next.parse(xs[1])))
      .map(xs => [[xs[0][0], xs[1][0]], xs[1][1]])
      .run()
  )
}

Parser.prototype.follows = function () {
  return [...arguments].reduce((prev, curr) => prev.follow(curr), this)
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
      .pip(link(xs => next.parse(xs[1])))
      .map(xs => [xs[0][0], xs[1][1]])
      .run()
  )
}


/*
 *  tuple1? -> [a, phase1]                 (check)
 *          -> [[a, phase1], tuple2?]      (glue )
 *          -> [[a, phase1], [b, phase2]]  (check)
 *          -> [b, phase2]
 */
Parser.prototype.move = function (next) {
  return new Parser(source =>
    link(() => this.parse(source))
      .pip(link(xs => next.parse(xs[1])))
      .map(xs => xs[1])
      .run()
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
      .run()
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

Parser.prototype.log = function (s) {
  return this.map(x => (console.log(s + x), x))
}



/**
 * Creates a parser that matches a single token based on the given predicate.
 *
 * @param {function} predicate - A function that takes a token and returns a boolean value indicating whether the token matches the desired criteria.
 * @return {Parser} - A parser object that can be used to parse tokens from a source string.
 */
const token = predicate => new Parser(
  source => source.length > 0
    ? predicate(source[0])
      ? [source[0], source.substring(1)]
      : undefined
    : undefined
);

/**
 * Parses a string into an array of tokens of length n that satisfy a given predicate.
 *
 * @param {number} n - The length of the tokens to parse.
 * @param {function} predicate - The function that checks if a token satisfies a condition.
 * @return {Parser} - The parser object that can parse the tokens.
 */
const tokens = (n, predicate) => new Parser(
  source => source.length >= n ?
    link(() => source.substring(0, n))
      .check(predicate)
      .map(x => [x, source.substring(n)])
      .run()
    : undefined
);
const inclusive = (n, ...xs) => tokens(n, x => xs.includes(x));

const character = char => token(x => x == char)
const includes = (...xs) => token(x => xs.includes(x))

const string = str => new Parser(
  source => source.length >= str.length
    ? source.startsWith(str)
      ? [str, source.substring(str.length)]
      : undefined
    : undefined
)

const space = character(' ');
const spacea = space.asterisk();
const spaces = space.plus();

const loose = x => spacea.follow(x).second()
const soft = x => loose(x).skip(spacea)

Number.prototype.boundedIn = proxy((x, a, b) => a <= x && x <= b)
String.prototype.code = proxy(x => x.codePointAt(0))
String.prototype.boundedIn = proxy((x, a, b) => x.code().boundedIn(a.code(), b.code()))

const digit = token(x => x.boundedIn('0', '9'))
const digits = digit.plus()

const letter = token(x => x.boundedIn('a', 'z') || x.boundedIn('A', 'Z'))
const letters = letter.plus()

export { token, tokens, character, includes, inclusive, string }
export { space, spacea, spaces, loose, soft }
export { digit, digits, letter, letters }
