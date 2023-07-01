
export const proxy = f => function (...xs) {
  return f(this, ...xs)
}

// Link

const defined = x => x != undefined;

const point = (x, f) => ({ x: x, y: f(x) });


class Link {
  constructor(run, chain = true) {
    this.run = run;
    this.chain = chain;
    this.suspend = () => this.chain = false;

    this.transfer = () => defined(this.next)
      ? (this.next.chain = this.chain) : true;

    this.make = f => x => this.transfer() ? f(x) : undefined;

    this.check = (predicate = defined) => this.next = new Link((...xs) => 
      (x => x.y ? x.x : (this.next.suspend(), undefined))
        // eslint-disable-next-line no-unexpected-multiline
        (point(this.run(...xs), this.make(predicate))));

    this.pip = next => this.next = new Link((...xs) => 
      (x => defined(x.y) ? [x.x, x.y] : (this.next.suspend(), undefined))
        // eslint-disable-next-line no-unexpected-multiline
        (point(this.run(...xs), this.make(next.run))));

    this.map = morph => this.next = new Link((...xs) => 
      this.make(morph)(this.run(...xs)));

  }
}

export const link = run => new Link(run).check();
