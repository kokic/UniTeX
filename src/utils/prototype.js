
export const proxy = f => function (...xs) {
  return f(this, ...xs)
}

Object.prototype.map = proxy((x, morph) => morph(x))
Object.prototype.get = proxy(x => typeof x == 'function' ? x() : x)

// Array.prototype.or = proxy(x => x.reduce((x, y) => x || y))
// Array.prototype.and = proxy(x => x.reduce((x, y) => x && y))
// Array.prototype.flator = proxy(x => x.flat().or() ? x : undefined)
// Array.prototype.flatand = proxy(x => x.flat().and() ? x : undefined)

Number.prototype.boundedIn = proxy((x, a, b) => a <= x && x <= b)
String.prototype.code = proxy(x => x.codePointAt(0))
String.prototype.boundedIn = proxy((x, a, b) => x.code().boundedIn(a.code(), b.code()))


// Link

const id = x => x
const point = (x, f) => ({ x: x, y: f(x) })

const Link = function (exec) {
  this.exec = exec
  this.check = (predicate = id) => {
    let origin = this.exec
    this.exec = (...xs) => point(origin(...xs), predicate)
      .map(x => x.y ? x.x : undefined)
    return this
  }
  this.glue = next => new Link((...xs) =>
    point(this.exec(...xs), x => x && next.exec(x))
      .map(x => x.y && [x.x, x.y]))
  this.map = morph => new Link((...xs) => morph(this.exec(...xs)))
}

export const link = exec => new Link(exec).check()
