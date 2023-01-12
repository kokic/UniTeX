
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

const defined = x => x != undefined
const point = (x, f) => ({ x: x, y: f(x) })

const Link = function (exec, chain = true) {
  this.exec = exec
  this.chain = chain
  this.suspend = () => this.chain = false
  this.transfer = () => defined(this.next)
    ? (this.next.chain = this.chain) : true

  this.check = (predicate = defined) => {
    let origin = this.exec
    this.exec = (...xs) => point(origin(...xs), predicate)
      .map(x => x.y ? x.x : (this.suspend(), undefined))
    return this
  }

  this.glue = next => this.next = new Link((...xs) =>
    point(this.exec(...xs), x => this.transfer() ? next.exec(x) : undefined)
      .map(x => x.y ? [x.x, x.y] : (this.next.suspend(), undefined)))

  this.map = morph => this.next = new Link((...xs) =>
    (x => this.transfer() ? morph(x) : undefined)
      (this.exec(...xs)))
}


export const link = exec => new Link(exec).check()

