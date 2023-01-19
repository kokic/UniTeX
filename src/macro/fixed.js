
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
  oint: '∮',
  oiint: '∯',
  oiiint: '∰',
  cint: '∱', // original
  intclockwise: '∱',
  ccint: '∲', // original
  lcirclerightint: '∲',
  accint: '∳', // original
  rcirclerightint: '∳',

  sim: '∼',
  backsim: '∽',
  approx: '≈',
  propto: '∝',
  nsim: '≁',
  simeq: '≃',
  nsimeq: '≄',
  cong: '≅',
  congneq: '≆',
  ncong: '≇',


  subset: '⊂',
  supset: '⊃',
  defeq: '≝',


  le: '≤',
  leq: '≤',
  leqslant: '⩽',
  ge: '≥',
  geq: '≥',
  geqslant: '⩾',

  to: '→',
  mapsto: '↦',
  larr: '←',
  lArr: '⇐',
  Larr: '⇐',
  rarr: '→',
  rArr: '⇒',
  Rarr: '⇒',

  longmapsto: '⟼',
  longrightarrow: '⟶',
  longleftarrow: '⟵',
  implies: '⟹',
  impliedby: '⟸',
  iff: '⟺',

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
  quad: ' '.repeat(4),
  qquad: ' '.repeat(6),
  ',': ' ',
  ';': ' '.repeat(2),

  '{': '{', 
  '}': '}', 
  '\\': '\n',
}

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

export default Fixed
