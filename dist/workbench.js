import { commandsJson, renderMarkdown, renderTypstMarkdown, renderUnicodeMarkdown } from './unitex.js'
import { markdownMath } from './markdown-math.js'

const { basicSetup } = CM['codemirror']
const { EditorView, placeholder } = CM['@codemirror/view']
const { autocompletion, snippetCompletion } = CM['@codemirror/autocomplete']
const { markdown } = CM['@codemirror/lang-markdown']

const sample = String.raw`# Euler’s pentagonal number theorem

The reciprocal of the partition generating function is sparse: its nonzero coefficients occur at the generalized pentagonal numbers $\gdef\pent#1{\frac{#1(3#1-1)}{2}}\pent{k}$ for $k\in\mathbb{Z}$.

$$
\prod_{m=1}^{\infty}(1-q^m)
= \sum_{k\in\mathbb{Z}}(-1)^k q^{\pent{k}}
$$`

const mathCompletions = JSON.parse(commandsJson()).flatMap(({ name, templates, unicode, group }) => {
  const option = { label: name, type: 'keyword', detail: [unicode, group].filter(Boolean).join(' ') }
  if (templates.length === 0) return [option]
  return templates.map(parts => {
    const literal = parts.map(([kind, text]) => kind === 'Literal' ? text : '').join('')
    const completion = { ...option, displayLabel: literal.split('\n')[0] }
    if (!parts.some(([kind]) => kind === 'Field')) return { ...completion, apply: literal }
    const template = parts.map(([kind, text]) => kind === 'Field' ? '${' + text + '}' : text).join('')
    return snippetCompletion(template, completion)
  })
})

function supplyUniTeXCompletions(context) {
  const token = context.matchBefore(/\\(?:[A-Za-z]+\*?|[^A-Za-z\s])?/)
  return token && { from: token.from, options: mathCompletions }
}

function readTexParam(search) {
  const param = search.slice(1).split('&').findLast(field => field.startsWith('tex='))
  if (!param) return null
  const value = param.slice('tex='.length)
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const workbench = document.querySelector('.workbench')
const paneButtons = document.querySelectorAll('.pane-switch button')
for (const button of paneButtons) {
  button.addEventListener('click', () => {
    workbench.dataset.activePane = button.dataset.pane
    for (const item of paneButtons) item.setAttribute('aria-pressed', item === button)
  })
}

const result = document.getElementById('result')
const resultView = document.getElementById('result-view')
const menu = document.getElementById('result-options')
const copyButton = document.getElementById('copy-result')
const clearButton = document.getElementById('clear-source')
const copyOptions = menu.querySelectorAll('[data-copy]')
const plainOutput = document.createElement('pre')
plainOutput.className = 'plain-output'

function isPreview(view) {
  return view === 'html' || view === 'mathml'
}

function updateOutput(source) {
  const view = resultView.value
  if (isPreview(view)) {
    result.innerHTML = renderMarkdown(source, view)
  } else {
    if (plainOutput.parentNode !== result) result.replaceChildren(plainOutput)
    const showTypst = view === 'typst'
    plainOutput.classList.toggle('typst-output', showTypst)
    plainOutput.textContent = showTypst ? renderTypstMarkdown(source) : renderUnicodeMarkdown(source)
  }
  clearButton.disabled = source === ''
  copyButton.disabled = source === ''
  for (const button of copyOptions) button.disabled = copyButton.disabled
}

const tex = readTexParam(window.location.search)
const editor = new EditorView({
  doc: tex === null ? sample : tex ? `$${tex}$` : '',
  parent: document.getElementById('source'),
  extensions: [
    basicSetup,
    markdown({ extensions: markdownMath }),
    placeholder('edit or paste'),
    EditorView.contentAttributes.of({ 'aria-label': 'Markdown' }),
    EditorView.lineWrapping,
    EditorView.updateListener.of(update => {
      if (update.docChanged) updateOutput(update.state.doc.toString())
    }),
    autocompletion({ override: [supplyUniTeXCompletions] }),
  ],
})

function refreshOutput() {
  updateOutput(editor.state.doc.toString())
}

function updateResultView() {
  menu.hidden = resultView.value === 'typst'
  menu.open = false
  refreshOutput()
}
resultView.addEventListener('change', updateResultView)
updateResultView()

function closeMenu() {
  menu.open = false
  menu.querySelector('summary').focus()
}

document.addEventListener('click', event => {
  if (menu.open && !menu.contains(event.target)) menu.open = false
})
menu.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) closeMenu()
})

clearButton.addEventListener('click', () => {
  editor.dispatch({ changes: { from: 0, to: editor.state.doc.length } })
  editor.focus()
})

let copyFeedbackTimer
async function copyOutput(style) {
  let text = isPreview(resultView.value) ? result.innerText : plainOutput.textContent
  if (style === 'trim') text = text.trim()
  if (style === 'single-line') text = text.replace(/\n/g, '')
  try {
    await copyText(text)
    copyButton.textContent = 'Copied'
  } catch {
    copyButton.textContent = 'Copy failed'
  }
  clearTimeout(copyFeedbackTimer)
  copyFeedbackTimer = setTimeout(() => { copyButton.textContent = 'Copy' }, 1600)
}

async function copyText(text) {
  if (navigator.clipboard) {
    try {
      return await navigator.clipboard.writeText(text)
    } catch {
      // Fall back for browsers that require a selected text field.
    }
  }
  const focused = document.activeElement
  const field = document.createElement('textarea')
  field.className = 'clipboard-bridge'
  field.readOnly = true
  field.value = text
  document.body.append(field)
  try {
    field.select()
    if (!document.execCommand('copy')) throw new Error('Copy failed')
  } finally {
    field.remove()
    focused?.focus()
  }
}

copyButton.addEventListener('click', () => copyOutput())
for (const button of copyOptions) {
  button.addEventListener('click', () => {
    closeMenu()
    copyOutput(button.dataset.copy)
  })
}
