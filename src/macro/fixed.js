
import Unicode from '../utils/unicode.js'

const Fixed = {
  N: Unicode.mathbb.N,
  Z: Unicode.mathbb.Z,
  Q: Unicode.mathbb.Q,
  R: Unicode.mathbb.R,
  C: Unicode.mathbb.C,
  natnums: Unicode.mathbb.N,
  reals: Unicode.mathbb.R,
  Reals: Unicode.mathbb.R,
  cnums: Unicode.mathbb.C,
  Complex: Unicode.mathbb.C,
  Bbbk: Unicode.mathbb.k,

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
  partial: '∂',
  nabla: '∇',
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
