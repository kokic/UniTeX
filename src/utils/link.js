
export const proxy = f => function (...xs) {
  return f(this, ...xs)
}

Object.prototype.map = proxy((x, morph) => morph(x))

// Link

const defined = x => x != undefined
const point = (x, f) => ({ x: x, y: f(x) })

const Link = function (exec, chain = true) {
  this.exec = exec
  this.chain = chain
  this.suspend = () => this.chain = false
  this.transfer = () => defined(this.next)
    ? (this.next.chain = this.chain) : true
  this.transphism = f => x => this.transfer() ? f(x) : undefined

  this.check = (predicate = defined) => this.next = new Link((...xs) =>
    (x => x.y ? x.x : (this.next.suspend(), undefined))
      (point(this.exec(...xs), this.transphism(predicate))))

  this.glue = next => this.next = new Link((...xs) =>
    (x => defined(x.y) ? [x.x, x.y] : (this.next.suspend(), undefined))
      (point(this.exec(...xs), this.transphism(next.exec))))

  this.map = morph => this.next = new Link((...xs) =>
    this.transphism(morph)(this.exec(...xs)))
}

export const link = exec => new Link(exec).check()
