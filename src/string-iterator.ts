
export type char = string;

class StringIterator {

  source: string;
  index: number;

  constructor(source: string, index: number) {
    this.source = source;
    this.index = index;
  }

  extract(pos: number | StringIterator): string {
    const end = typeof pos == "number" ? pos : pos.index;
    return this.source.substring(this.index, end);
  }

  hasNext(): boolean {
    return this.index < this.source.length;
  }

  curr(): char {
    return this.source.charAt(this.index);
  }

  next(): StringIterator {
    return new StringIterator(this.source, this.index + 1);
  }

  forward(length: number): StringIterator {
    return new StringIterator(this.source, this.index + length);
  }
}

export { StringIterator };
