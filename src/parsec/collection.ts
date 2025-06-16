import { error, Flat, success } from "./parse.ts";
import { char, StringIterator } from "./string-iterator.ts";
import { Parser } from "./combinator.ts";
import "./declare-global.ts";

export const token = (predicate: (c: char) => boolean, err?: string) =>
  new Parser<string>((it, c = it.curr()) =>
    c && predicate(c) ? success(it.next(), c) : error(it, err || "token mismatch"));

export const tokens = (n: number, predicate: (s: string) => boolean, err?: string) =>
  new Parser<string>((it: StringIterator
    , pos = it.forward(n)
    , substr = it.extract(pos)) =>
    predicate(substr)
      ? success(pos, substr)
      : error(it, err || `expected: tokens length ${n}`));

export const character = (c: char) => new Parser(Flat.pchar(c));
export const includes = (...xs: char[]) => token(x => xs.includes(x));

export const string = (s: string) => new Parser(Flat.pstring(s));
export const inclusive = (n: number, ...xs: string[]) => tokens(n, x => xs.includes(x));

export const space = character(" ");
export const spaceAster = space.asterisk();
export const spacePlus = space.plus();

export const loose = <α>(p: Parser<α>) => spaceAster.move(p);
export const soft = <α>(p: Parser<α>) => loose(p).skip(spaceAster);

export const digit = token(c => c.boundedIn('0', '9'));
export const digits = digit.plus();

export const letter = token(c => c.boundedIn('a', 'z') || c.boundedIn('A', 'Z'));
export const letters = letter.plus();
