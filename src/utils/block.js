
String.prototype.fill = function (n) {
  const residue = n - this.length
  if (residue == n) return ' '.repeat(n)
  if (residue == 0) return this
  if (residue < 0) return this.substring(0, n)
  const left = Math.floor(residue / 2)
  const right = residue - left
  return ' '.repeat(left) + this + ' '.repeat(right)
}

const Block = function (data, baseline = 0) {
  this.width = Math.max(...data.map(x => x.length))
  this.height = data.length
  this.data = data.map(x => x.fill(this.width))
  this.string = this.data.join('\n')
  this.baseline = baseline

  this.blocklift = function (n, offset) {
    const residue = n - this.height
    if (residue == 0) return this
    const topline = Array(offset).fill('')
    const bottomline = Array(residue - offset).fill('')
    return new Block(topline.concat(this.data).concat(bottomline))
  }

  this.append = function (block) {
    const major = this.height > block.height
    const supbase = this.baseline > block.baseline
    const offset = supbase
      ? this.baseline - block.baseline
      : block.baseline - this.baseline
    const baseline = supbase ? this.baseline : block.baseline
    const [left, right] = major
      ? [this.data, block.blocklift(this.height, offset).data]
      : [this.blocklift(block.height, offset).data, block.data]
    return new Block(left.map((v, i) => v + right[i]), baseline)
  }
  
  this.add = block => this.append(Block.plus).append(block)

  this.over = function (block) {
    const width = Math.max(this.width, block.width) + 2
    const fracline = '-'.repeat(width)
    const data = [...this.data, fracline, ...block.data]
    return new Block(data.map(x => x.fill(width)), this.height)
  }
}

String.prototype.toBlock = function () {
  return new Block([this])
}
Block.of = s => s.toBlock()

Block.empty = ''.toBlock()
Block.plus = ' + '.toBlock()

const fracByString = function (x, y) {
  const width = Math.max(x.length, y.length) + 2
  const data = [x.fill(width), '-'.repeat(width), y.fill(width)]
  return new Block(data, 1)
}

const frac = function (a, b) {
  if (a instanceof Block && b instanceof Block) return a.over(b)
  if (typeof a == 'string' && typeof b == 'string') return fracByString(a, b)
  if (typeof a == 'string') return frac(new Block([a]), b)
  if (typeof b == 'string') return frac(a, new Block([b]))
}
Block.frac = frac

String.prototype.add = function (x) {
  const other = typeof x == 'string' ? x.toBlock() : x
  return this.toBlock().add(other)
}



export default Block

// const frac1 = frac('a', 'b')
// const frac2 = frac('x', 'y + z')

// const frac3 = frac('u', x.add(frac1))


