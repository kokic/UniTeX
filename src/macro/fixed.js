
import Unicode from '../utils/unicode.js'

const Fixed = {
  N: Unicode.typeface.mathbb.N,
  Z: Unicode.typeface.mathbb.Z,
  Q: Unicode.typeface.mathbb.Q,
  R: Unicode.typeface.mathbb.R,
  C: Unicode.typeface.mathbb.C,
  CC: Unicode.typeface.mathbb.C,
  A: Unicode.typeface.mathbb.A,
  F: Unicode.typeface.mathbb.F,
  SS: Unicode.typeface.mathbb.S,

  natnums: Unicode.typeface.mathbb.N,
  reals: Unicode.typeface.mathbb.R,
  Reals: Unicode.typeface.mathbb.R,
  cnums: Unicode.typeface.mathbb.C,
  Complex: Unicode.typeface.mathbb.C,
  Bbbk: Unicode.typeface.mathbb.k,

  /* Theorem */

  proposition: Unicode.render('Proposition', 'textbf'),
  lemma: Unicode.render('Lemma', 'textbf'),
  theorem: Unicode.render('Theorem', 'textbf'),
  corollary: Unicode.render('Corollary', 'textbf'),
  definition: Unicode.render('Definition', 'textbf'),
  remark: Unicode.render('Remark', 'textbf'),
  hypothesis: Unicode.render('Hypothesis', 'textbf'),
  conjecture: Unicode.render('Conjecture', 'textbf'),
  axiom: Unicode.render('Axiom', 'textbf'),
  example: Unicode.render('Example', 'textbf'),
  proof: Unicode.render('proof', 'textit'),

  /* combined operatorname */
  argmax: 'arg max',
  argmin: 'arg min',
  injlim: 'inj lim',
  liminf: 'lim inf',
  limsup: 'lim sup',
  projlim: 'proj lim',

  cdot: '⋅',
  cdotp: '⋅',
  circ: '∘',

  dots: '…',
  cdots: '⋯',
  ldots: '…',
  ddots: '⋱',
  vdots: '⋮',

  prime: '′',
  Box: '□',
  S: '§',
  sect: '§',

  /* Big Operators */
  bigotimes: '⨂',
  bigvee: '⋁',
  bigoplus: '⨁',
  bigwedge: '⋀',
  bigodot: '⨀',
  bigcup: '⋂',
  biguplus: '⨄',
  bigcup: '⋃',
  bigsqcup: '⨆',

  wedge: '∧',
  vee: '∨',
  sqcap: '⊓',
  sqcup: '⊔',
  boxdot: '⊡',
  boxplus: '⊞',
  boxminus: '⊟',
  boxtimes: '⊠',

  oplus: '⊕',
  ominus: '⊖',
  otimes: '⊗',
  oslash: '⊘',

  lhd: '⊲',
  unlhd: '⊴',
  rhd: '⊳',
  unrhd: '⊵',
  setminus: '∖',
  smallsetminus: '∖',
  curlywedge: '⋏',
  doublebarwedge: '⩞',
  curlyvee: '⋎',
  eebar: '⊻',


  /* Block 79 : Mathematical Operators */
  forall: '∀',
  complement: '∁',
  partial: '∂',
  exist: '∃',
  exists: '∃',
  noexist: '∄',
  empty: '∅',
  emptyset: '∅',
  varnothing: '∅',
  increment: '∆', // original
  nabla: '∇',
  in: '∈',
  isin: '∈',
  notin: '∉',
  smallin: '∊', // original
  ni: '∋',
  notni: '∌',
  smallni: '∍', // original
  blacksquare: '∎',
  prod: '∏',

  coprod: '∐',
  sum: '∑',
  minus: '−',
  mp: '∓',
  dotplus: '∔',
  division: '∕', // original
  backslash: '∖',
  ast: '∗',
  circ: '∘',
  bullet: '∙',
  infty: '∞',
  infin: '∞',
  mid: '∣',
  nmid: '∤',
  parallel: '∥',
  nparallel: '∦',
  land: '∧',
  lor: '∨',
  cap: '∩',
  cup: '∪',
  int: '∫',
  iint: '∬',
  iiint: '∭',
  iiiint: '⨌',
  oint: '∮',
  oiint: '∯',
  oiiint: '∰',
  cint: '∱', // original
  intclockwise: '∱',
  ccint: '∲', // original
  lcirclerightint: '∲',
  accint: '∳', // original
  rcirclerightint: '∳',

  propto: '∝',

  sim: '∼',
  backsim: '∽',
  approx: '≈',
  nsim: '≁',
  simeq: '≃',
  nsimeq: '≄',
  cong: '≅',
  congneq: '≆',
  ncong: '≇',

  approx: '≈', // u2248
  nappox: '≉', // original

  precapprox: '≾',
  succapprox: '≿',

  eq: '=',
  ne: '≠',
  neq: '≠',
  stareq: '≛', // original
  deltaeq: '≜', // original
  triangleq: '≜',
  meq: '≞', // original
  defeq: '≝', // original
  qeq: '≟', // original

  lt: '>',
  le: '≤', leq: '≤',
  leqslant: '⩽',
  gt: '>',
  ge: '≥', geq: '≥',
  geqslant: '⩾',

  smile: '⌣',

  sub: '⊂', subset: '⊂',
  subsete: '⊆', subseteq: '⊆',
  subseteqq: '⫅',
  supset: '⊃',
  supsete: '⊇', supseteq: '⊇',
  supseteqq: '⫆',

  circlearrowleft: '↺',
  leftharpoonup: '↼',
  rArr: '⇒',
  circlearrowright: '↻',
  leftleftarrows: '⇇',
  rarr: '→',
  curvearrowleft: '↶',
  leftrightarrow: '↔',
  restriction: '↾',
  curvearrowright: '↷',
  Leftrightarrow: '⇔',
  rightarrow: '→',
  Darr: '⇓',
  leftrightarrows: '⇆',
  Rightarrow: '⇒',
  dArr: '⇓',
  leftrightharpoons: '⇋',
  rightarrowtail: '↣',
  darr: '↓',
  leftrightsquigarrow: '↭',
  rightharpoondown: '⇁',
  dashleftarrow: '⇠',
  Lleftarrow: '⇚',
  rightharpoonup: '⇀',
  dashrightarrow: '⇢',
  longleftarrow: '⟵',
  rightleftarrows: '⇄',
  downarrow: '↓',
  Longleftarrow: '⟸',
  rightleftharpoons: '⇌',
  Downarrow: '⇓',
  longleftrightarrow: '⟷',
  rightrightarrows: '⇉',
  downdownarrows: '⇊',
  Longleftrightarrow: '⟺',
  rightsquigarrow: '⇝',
  downharpoonleft: '⇃',
  longmapsto: '⟼',
  Rrightarrow: '⇛',
  downharpoonright: '⇂',
  longrightarrow: '⟶',
  Rsh: '↱',
  gets: '←',
  Longrightarrow: '⟹',
  searrow: '↘',
  Harr: '⇔',
  looparrowleft: '↫',
  swarrow: '↙',
  hArr: '⇔',
  looparrowright: '↬',
  to: '→',
  harr: '↔',
  Lrarr: '⇔',
  twoheadleftarrow: '↞',
  hookleftarrow: '↩',
  lrArr: '⇔',
  twoheadrightarrow: '↠',
  hookrightarrow: '↪',
  lrarr: '↔',
  Uarr: '⇑',
  iff: '⟺',
  Lsh: '↰',
  uArr: '⇑',
  impliedby: '⟸',
  mapsto: '↦',
  uarr: '↑',
  implies: '⟹',
  nearrow: '↗',
  uparrow: '↑',
  Larr: '⇐',
  nleftarrow: '↚',
  Uparrow: '⇑',
  lArr: '⇐',
  nLeftarrow: '⇍',
  updownarrow: '↕',
  larr: '←',
  nleftrightarrow: '↮',
  Updownarrow: '⇕',
  leadsto: '⇝',
  nLeftrightarrow: '⇎',
  upharpoonleft: '↿',
  leftarrow: '←',
  nrightarrow: '↛',
  upharpoonright: '↾',
  Leftarrow: '⇐',
  nRightarrow: '⇏',
  upuparrows: '⇈',
  leftarrowtail: '↢',
  nwarrow: '↖',
  leftharpoondown: '↽',
  Rarr: '⇒',

  pm: '±',
  plusmn: '±',
  times: '×',
  ltimes: '⋉',
  rtimes: '⋊',

  aleph: 'ℵ',
  alef: 'ℵ',
  alefsym: 'ℵ',
  ell: 'ℓ',
  wp: '℘',
  weierp: '℘',

  /* Spacing */
  ',': ' ',
  '>': ' ',
  ':': ' ',
  ';': ' '.repeat(2),
  '!': '', // stub
  quad: ' '.repeat(4),
  qquad: ' '.repeat(6),
  thinspace: ' ',
  medspace: ' ',
  thickspace: ' '.repeat(2),
  enspace: ' '.repeat(2),
  negthickspace: '', // stub
  negthinspace: '', // stub
  negmedspace: '', // stub



  '(': '(',
  ')': ')',
  '[': '[',
  ']': ']',
  '{': '{',
  '}': '}',
  '_': '_',
  '%': '%',
  '\\': '\n',
  'newline': '\n',

  /* Symbols and Punctuation */
  surd: '√',
  checkmark: '✓',
  top: '⊤',
  bot: '⊥',
  mho: '℧',

}

const operatornames = [
  'arcsin', 'arccos', 'arctan', 'arctg',
  'arcctg', 'arg', 'ch', 'cos',
  'det', 'gcd', 'inf', 'cosec',
  'cosh', 'cot', 'cotg', 'coth',
  'csc', 'ctg', 'cth', 'lim',
  'max', 'deg', 'dim', 'exp',
  'hom', 'ker', 'lg', 'ln',
  'log', 'min', 'plim', 'Pr',
  'sup', 'sec', 'sin', 'sinh',
  'sh', 'tan', 'tanh', 'tg',
  'th'
]
operatornames.forEach(x => Fixed[x] = x)


const greeks = [
  'Alpha', 'Beta', 'Gamma', 'Delta',
  'Epsilon', 'Zeta', 'Eta', 'Theta',
  'Iota', 'Kappa', 'Lambda', 'Mu',
  'Nu', 'Xi', 'Omicron', 'Pi',
  'Rho', 'Sigma', 'Tau', 'Upsilon',
  'Phi', 'Chi', 'Psi', 'Omega',

  'alpha', 'beta', 'gamma', 'delta',
  'epsilon', 'zeta', 'eta', 'theta',
  'iota', 'kappa', 'lambda', 'mu',
  'nu', 'xi', 'omicron', 'pi',
  'rho', 'sigma', 'tau', 'upsilon',
  'phi', 'chi', 'psi', 'omega'
]
greeks.forEach((x, i) => Fixed[x] = Unicode.greeks[i])

// fixed symbol as supscripts
Unicode.supscripts[Fixed.times] = Unicode.supscripts.x

// fixed symbol as subscripts
Unicode.subscripts[Fixed.in] = Fixed.smallin
Unicode.subscripts[Fixed.ni] = Fixed.smallni


export default Fixed
