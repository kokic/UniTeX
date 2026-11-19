function createStexMode(startInMath) {
  const commandArgumentStyles = new Map([
    ['importmodule', ['string', 'builtin']],
    ['documentclass', ['', 'atom']],
    ...[
      'usepackage', 'begin', 'end', 'label', 'ref', 'eqref', 'cite',
      'bibitem', 'Bibitem', 'RBibitem',
    ].map(name => [name, ['atom']]),
  ])

  const mathDelimiters = [
    ['\\[', '\\]'],
    ['\\(', '\\)'],
    ['$$', '$$'],
    ['$', '$'],
  ]

  function activeArgumentStyle(commands) {
    for (let i = commands.length - 1; i >= 0; i--) {
      const command = commands[i]
      if (command) return command.styles[command.argumentIndex] || null
    }
    return null
  }

  function tokenizeComment(stream) {
    stream.skipToEnd()
    return 'comment'
  }

  function tokenizeText(stream, state) {
    const { commands } = state
    if (stream.match(/^\\[a-zA-Z@\xc0-\u1fff\u2060-\uffff]+/)) {
      const styles = commandArgumentStyles.get(stream.current().slice(1))
      commands.push(styles ? { styles, argumentIndex: -1 } : null)
      state.tokenize = tokenizeArgumentBoundary
      return 'tag'
    }

    if (stream.match(/^\\[$&%#{}_,;!\/\\]/)) return 'tag'

    for (const [open, close] of mathDelimiters) {
      if (stream.match(open)) {
        state.tokenize = (stream, state) => tokenizeMath(stream, state, close)
        return 'keyword'
      }
    }

    const ch = stream.next()
    if (ch === '%') return tokenizeComment(stream)
    if (ch === '}' || ch === ']') {
      if (commands.length === 0) return 'error'
      state.tokenize = tokenizeArgumentBoundary
      return 'bracket'
    }
    if (ch === '{' || ch === '[') {
      // An unstyled group still needs a stack entry for its closing bracket.
      commands.push(null)
      return 'bracket'
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\w.%]/)
      return 'atom'
    }

    stream.eatWhile(/[\w\-_]/)
    return activeArgumentStyle(commands)
  }

  function tokenizeMath(stream, state, close) {
    if (stream.eatSpace()) return null
    if (close && stream.match(close)) {
      state.tokenize = tokenizeText
      return 'keyword'
    }
    if (stream.match(/^\\(?:[a-zA-Z@]+|[$&%#{}_,;!\/])/)) return 'macroName'
    if (stream.match(/^[a-zA-Z]+/)) return 'variableName.special'
    if (stream.match(/^[\^_&]/)) return 'operator'
    if (stream.match(/^[+\-<>|=,\/@!*:;'"`~#?]/)) return null
    if (stream.match(/^(\d+\.\d*|\d*\.\d+|\d+)/)) return 'number'

    const ch = stream.next()
    if (ch === '%') return tokenizeComment(stream)
    return '{}[]()'.includes(ch) ? 'bracket' : 'error'
  }

  function tokenizeArgumentBoundary(stream, state) {
    const ch = stream.peek()
    if (ch === '{' || ch === '[') {
      const command = state.commands[state.commands.length - 1]
      if (command) command.argumentIndex++
      stream.eat(ch)
      state.tokenize = tokenizeText
      return 'bracket'
    }
    if (/[ \t\r]/.test(ch)) {
      stream.eat(ch)
      return null
    }

    state.commands.pop()
    state.tokenize = tokenizeText
    return tokenizeText(stream, state)
  }

  const initialTokenizer = startInMath ? tokenizeMath : tokenizeText
  return {
    name: 'stex',
    startState() {
      return { commands: [], tokenize: initialTokenizer }
    },
    copyState(state) {
      // Copy the stack, but keep the active command frames shared.
      return { commands: state.commands.slice(), tokenize: state.tokenize }
    },
    token(stream, state) {
      return state.tokenize(stream, state)
    },
    blankLine(state) {
      state.commands.length = 0
      state.tokenize = initialTokenizer
    },
    languageData: {
      commentTokens: { line: '%' },
    },
  }
}

export const stex = createStexMode(false)
export const stexMath = createStexMode(true)
