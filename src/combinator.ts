import { type StringIterator } from './string-iterator.ts';
import { error, Flat, success, type Parse, type ParseResult } from './parse.ts'
import { Lazy, run } from './lazy.ts';

export class Parser<α> {
  parse: Parse<α>

  constructor(parse: Parse<α>) {
    this.parse = parse;
  }

  /**
   * `(p₁, r₁) → (0, ⌀) | (p₁, r₁)⁺`
   */
  many() {
    return new Parser((it) => {
      const list: α[] = [];
      let result: ParseResult<α>;
      let pos: StringIterator = it;
      while ((result = this.parse(pos)).type != "error") {
        list.push(result.res);
        pos = result.pos;
      }
      return success(result.pos, list);
    })
  }

  /**
   * default as `Parser<string>`
   */
  asterisk(f?: (s: α, t: α) => α) {
    const items = this.many();
    return f ? items.map(xs => xs.reduce((s, t) => f(s, t)))
      : (items as Parser<string[]>).map(xs => xs.reduce((s, t) => s + t, ""));
  }

  /**
   * `(p₁, r₁) → (p₁, r₁)⁺`
   */
  some() {
    return new Parser((it) => {
      const list: α[] = [];
      let pos: StringIterator = it;
      let result: ParseResult<α> = this.parse(pos);
      while ((result = this.parse(pos)).type != "error") {
        list.push(result.res);
        pos = result.pos;
      }
      return list.length >= 1
        ? success(result.pos, list)
        : error<α[]>(it, result.err)
    });
  }

  /**
   * default as `Parser<string>`
   */
  plus(f?: (s: α, t: α) => α) {
    const items = this.some();
    return f ? items.map(xs => xs.reduce((s, t) => f(s, t)))
      : (items as Parser<string[]>).map(xs => xs.reduce((s, t) => s + t));
  }

  /**
   * `(p₁, r₁) → f → (p₁, f r₁)`
   */
  map<β>(f: (a: α) => β) {
    return new Parser((it) => {
      const result = this.parse(it);
      return result.type != "error"
        ? success(result.pos, f(result.res)) : result;
    });
  }

  /**
   * `(p₁, r₁) → p → p r₁ → (p₁, r₁)`
   */
  assume(predicate: (res: α) => boolean, err?: string) {
    return new Parser((it) => {
      const result = this.parse(it);
      return result.type != "error"
        ? predicate(result.res)
          ? success(result.pos, result.res)
          : error<α>(it, err || "assume fail")
        : result;
    });
  }


  /**
   * `(p₁, r₁) | (p₂, r₂)`
   */
  or(p: Parser<α> | Lazy<Parser<α>>) {
    return new Parser((it) => Flat.orElse(this.parse, run(p).parse)(it));
  }

  /**
   * `(p₁, r₁) → (p₂, r₂) → (p₂, (r₁, r₂))`
   */
  follow<β>(p: Parser<β> | Lazy<Parser<β>>): Parser<[α, β]> {
    return new Parser((it) => {
      const result = this.parse(it);
      if (result.type != "error") {
        const continued = run(p).parse(result.pos);
        return continued.type != "error"
          ? success(continued.pos, [result.res, continued.res])
          : error(result.pos, continued.err);
      }
      return error(it, result.err);
    });
  }

  /**
   * `(p₁, r₁) → (p₂, r₂) → (p₃, r₃) → (p₂, (r₁, r₂))`
   */
  follow2<β, γ>(p: Parser<β>, q: Parser<γ>) {
    return this.follow(p).follow(q);
  }

  /**
   * `(p₁, r₁) → (p₂, r₂) → (p₂, r₁)`
   */
  skip<β>(p: Parser<β>): Parser<α> {
    return new Parser((it) => {
      const result = this.parse(it);
      if (result.type != "error") {
        const ignored = p.parse(result.pos);
        return ignored.type != "error"
          ? success(ignored.pos, result.res)
          : error(result.pos, ignored.err)
      }
      return error(it, result.err)
    })
  }

  /**
   * `(p₁, r₁) → (p₂, r₂) → (p₂, r₂)`
   */
  move<β>(p: Parser<β> | Lazy<Parser<β>>): Parser<β> {
    return new Parser((it) => {
      const ignored = this.parse(it);
      if (ignored.type != "error") {
        const result = run(p).parse(ignored.pos);
        return result.type != "error"
          ? success(result.pos, result.res)
          : error(ignored.pos, result.err)
      }
      return error(it, ignored.err)
    })
  }
}
