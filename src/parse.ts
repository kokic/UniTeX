
import { StringIterator, char } from './string-iterator.ts'

export type ParseResult<α> =
  | { type: "success", pos: StringIterator, res: α }
  | { type: "error", pos: StringIterator, err: string }

export const success = <α>(pos: StringIterator, res: α)
  : ParseResult<α> => ({ type: "success", pos, res })

const defaultMessage = (pos: StringIterator) =>
  `mismatched: ${pos.extract(pos.index + 5)}...`

export const error = <α>(pos: StringIterator, err?: string)
  : ParseResult<α> => ({ type: "error", pos, err: err ? err : defaultMessage(pos) })

const never = <α>()
  : ParseResult<α> => error({} as StringIterator, "never");

export type Parse<α> = (input: StringIterator) => ParseResult<α>

const pure = <α>(a: α): Parse<α> => it => success(it, a)

const bind = <α, β>(f: Parse<α>, g: (a: α) => Parse<β>): Parse<β> =>
  (it: StringIterator) => (x =>
    x.type == "success" ? g(x.res)(x.pos) :
      x.type == "error" ? error(x.pos, x.err) :
        never())(f(it))

const fail = <α>(msg: string): Parse<α> => it => error(it, msg)

export namespace Flat {

  export const orElse = <α>(p: Parse<α>, q: Parse<α>): Parse<α> =>
    (it: StringIterator) => (x =>
      x.type == "success" ? x :
        x.type == "error" ? (it == x.pos ? q(it) : x) :
          never())(p(it))

  export const attempt = <α>(p: Parse<α>): Parse<α> =>
    (it: StringIterator) => (x =>
      x.type == "success" ? x :
        x.type == "error" ? error(it, x.err) :
          never())(p(it))

  export const pstring = (s: string): Parse<string> =>
    (it: StringIterator
      , pos = it.forward(s.length)
      , substr = it.extract(pos)) =>
      substr == s
        ? success(pos, substr)
        : error(it, `expected: ${s}`)

  const unexpectedEndOfInput = "unexpected end of input"

  export const anyChar: Parse<char> = it => it.hasNext()
    ? success(it.next(), it.curr())
    : error(it, unexpectedEndOfInput)

  export const pchar = (c: char): Parse<char> =>
    attempt(bind(anyChar, u => u == c ? pure(c) : fail(`expected: ${c}`)))

}

declare global {
  interface String {
    toIterator(this: string): StringIterator;
  }
}

String.prototype.toIterator = function () {
  return new StringIterator(this, 0)
}
