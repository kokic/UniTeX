
/**
 * Calculates the desired length of a string by adding spaces 
 * on both sides if needed or by truncating it.
 *
 * @param {string} s - The input string.
 * @param {number} n - The desired length of the string.
 * @return {string} The modified string with the desired length.
 */
const desired_length_string = function (s: string, n: number): string {
  // Calculate the number of spaces needed to fill the string
  const residue = n - s.length;

  // If the desired length is equal to the length of the string, 
  // return the string itself
  if (residue === 0) return s;

  // If the desired length is greater than the length of the string, 
  // return the string with spaces appended
  if (residue > 0) {
    const left = Math.floor(residue / 2);
    const right = residue - left;
    return ' '.repeat(left) + s + ' '.repeat(right);
  }

  // If the desired length is smaller than the length of the string, 
  // return a substring of the string with the desired length
  return s.substring(0, n);
}


class Block {
  width: number;
  height: number;
  data: string[];
  display: string;
  /**
   * y-position of block concat point
   */
  baseline: number;

  constructor(data: string[], baseline = 0) {
    this.width = Math.max(...data.map(x => x.length));
    this.height = data.length;
    this.data = data.map(x => desired_length_string(x, this.width));
    this.display = this.data.join('\n');
    this.baseline = baseline;
  }

  /**
   * 
   * @param n block height
   * @param offset baseline offset
   * @returns adjusted block
   */
  adjustHeight(n: number, offset: number) {
    const residue = n - this.height;
    if (residue == 0) {
      return this;
    }
    const topLine = Array(offset).fill('');
    const bottomLine = Array(residue - offset).fill('');
    return new Block(topLine.concat(this.data).concat(bottomLine));
  }

  /**
   * glue blocks in x-axis
   */
  append(block: Block) {
    const isHigher = this.height > block.height;
    const isGreat = this.baseline > block.baseline;
    const [offset, baseline] = isGreat
      ? [this.baseline - block.baseline, this.baseline]
      : [block.baseline - this.baseline, block.baseline]
    const [left, right] = isHigher
      ? [this.data, block.adjustHeight(this.height, offset).data]
      : [this.adjustHeight(block.height, offset).data, block.data];
      return new Block(left.map((v, i) => v + right[i]), baseline);
  }

  add = (block: Block) => this.append(Block.plus).append(block);

  over(block: Block) {
    const width = Math.max(this.width, block.width) + 2;
    const fracline = '-'.repeat(width);
    const data = [...this.data, fracline, ...block.data];
    return new Block(data.map(x => desired_length_string(x, width)), this.height);
  }

  static of = (s: string) => new Block([s]);

  static empty = Block.of('');
  static plus = Block.of(' + ');

  static fromStrings(p: string, q: string) {
    const width = Math.max(p.length, q.length) + 2;
    const desired_p = desired_length_string(p, width);
    const desired_q = desired_length_string(q, width);  
    const data = [desired_p, '-'.repeat(width), desired_q];
    return new Block(data, 1);
  }

  static frac(a: string | Block, b: string | Block): Block {
    return a instanceof Block && b instanceof Block
      ? a.over(b) : typeof a == "string" && typeof b == "string"
        ? Block.fromStrings(a, b) : typeof a == "string"
          ? Block.frac(Block.of(a), b) : Block.frac(a, Block.of(b as string))
  }
}

export default Block
