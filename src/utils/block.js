
String.prototype.fillTo = function (n) {
  const residue = n - this.length
  if (residue == 0) return this
  if (residue < 0) return this.substring(0, n)
  const halfspace = ' '.repeat(residue / 2)
  return halfspace + this + halfspace
}

const Block = function (data) {
  this.data = data
  this.width = Math.max(...data.map(x => x.length))
  this.height = data.length

  this.verticalize = function () {
    return new Block(this.data.map(x => x.fillTo(this.width)))
  }

  this.heightlift = function (n) {
    const halfline = Array((n - this.height) / 2).fill('')
    return new Block(halfline.concat(this.data).concat(halfline))
  }

  this.add = function (block) {
    const major = this.height > block.height
    const half = Math.abs(larger.height - lesser.height) / 2
    const [larger, lesser, offset1, offset2] = major ?
      [this, block, 0, -half] : [block, this, -half, 0]
    const merged = []

    for (const index in larger.data) {
      // this[index + offset1] + block[index + offset2]
    }
  }
}


console.log(new Block([
   'a', 
  '---', 
   'b', 
]))

