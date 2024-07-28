import { StringIterator, type char } from "./string-iterator";

declare global {
  interface Number {
    boundedIn(this: number, a: number, b: number): boolean;
  }

  interface String {
    boundedIn(this: char, a: char, b: char): boolean;
  }
}

Number.prototype.boundedIn = function (a, b) {
  return a <= this && this <= b;
}

String.prototype.boundedIn = function (a, b) {
  const [code, start, end] = [this, a, b].map(s => s.codePointAt(0)!);
  return code.boundedIn(start, end);
}

declare global {
  interface String {
    toIterator(this: string): StringIterator;
  }
}

String.prototype.toIterator = function () {
  return new StringIterator(this, 0)
}
