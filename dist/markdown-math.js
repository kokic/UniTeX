import { stexMath } from './legacy/stex.js'

const { StreamLanguage } = CM['@codemirror/language']
const { parseMixed } = CM['@lezer/common']
const { tags } = CM['@lezer/highlight']
const texParser = StreamLanguage.define(stexMath).parser
const dollar = '$'.charCodeAt(0)

function findMathClose(context, from, width) {
  let depth = 0
  for (let pos = from; pos < context.end; pos++) {
    const ch = context.slice(pos, pos + 1)
    if (ch === '\\' && /[\\${}]/.test(context.slice(pos + 1, pos + 2))) {
      pos++
    } else if (ch === '{') {
      depth++
    } else if (ch === '}') {
      if (depth === 0) return -1
      depth--
    } else if (ch === '$' && depth === 0) {
      // A single dollar in the opener's brace context cannot close display math.
      if (width === 2) return context.char(pos + 1) === dollar ? pos : -1
      return pos > from ? pos : -1
    }
  }
  return -1
}

export const markdownMath = {
  defineNodes: ['MathSpan', { name: 'MathMark', style: tags.keyword }],
  parseInline: [{
    name: 'MathSpan',
    after: 'Escape',
    parse(context, next, start) {
      if (next !== dollar) return -1
      const width = context.char(start + 1) === dollar ? 2 : 1
      const from = start + width
      const to = findMathClose(context, from, width)
      if (to < 0) return -1
      const end = to + width
      return context.addElement(context.elt('MathSpan', start, end, [
        context.elt('MathMark', start, from),
        context.elt('MathMark', to, end),
      ]))
    },
  }],
  wrap: parseMixed(node => {
    if (node.name !== 'MathSpan') return null
    // Children are the math delimiters and any intervening Markdown quote marks.
    const overlay = []
    let from = node.from
    for (let mark = node.node.firstChild; mark; mark = mark.nextSibling) {
      if (from < mark.from) overlay.push({ from, to: mark.from })
      from = mark.to
    }
    return overlay.length ? { parser: texParser, overlay } : null
  }),
}
