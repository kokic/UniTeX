
import Unicode from '../utils/unicode.js'

const Fixed = {
  N: Unicode.mathbb.N,
  Z: Unicode.mathbb.Z,
  Q: Unicode.mathbb.Q,
  R: Unicode.mathbb.R,
  C: Unicode.mathbb.C,
  CC: Unicode.mathbb.C,
  A: Unicode.mathbb.A,
  F: Unicode.mathbb.F,

  natnums: Unicode.mathbb.N,
  reals: Unicode.mathbb.R,
  Reals: Unicode.mathbb.R,
  cnums: Unicode.mathbb.C,
  Complex: Unicode.mathbb.C,
  Bbbk: Unicode.mathbb.k,

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
  nsim: '≁',
  simeq: '≃',
  nsimeq: '≄',
  cong: '≅',
  congneq: '≆',
  ncong: '≇',


  subset: '⊂',
  supset: '⊃',
  defeq: '≝',



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

export default Fixed
