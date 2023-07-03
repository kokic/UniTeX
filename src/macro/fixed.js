
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


  /**
   * In order to express my respect to all TeX-related project developers, 
   * I reserve these special macro commands and follow the consistent tradition 
   * to implement UniTeX.
   */

  TeX: 'TᴇX', 
  LaTeX: 'LᴬTᴇX', 
  KaTeX: 'KᴬTᴇX', 
  UniTeX: 'UⁿᵢTᴇX', 
  Agda: '𝐴gda', 
  Lean: 'L∃∀N', 


  /* Accents */
  hat: '\u0302', 
  tilde: '\u0303', 
  bar: '\u0304', 
  overline: '\u0305', 
  breve: '\u0306', 

  widetilde: '\u0360', 

  uwidebreve: '\u035c', 
  widebreve: '\u035d', 
  widepreve: '\u0361', 

  uvec: '\u0362', 

  /* Frequent */
  degree: '°', 

  /* Variant */
  varGamma: 'Γ', 
  varDelta: 'Δ', 
  varTheta: 'Θ', 
  varLambda: 'Λ', 
  varXi: 'Ξ', 
  varPi: 'ϖ', 
  varSigma: 'Σ', 
  varUpsilon: 'Υ', 
  varPhi: 'Φ', 
  varPsi: 'Ψ', 
  varOmega: 'Ω', 

  varepsilon: 'ε', 
  varkappa: 'ϰ', 
  vartheta: 'ϑ', 
  thetasym: 'ϑ', 
  varpi: 'ϖ', 
  varrho: 'ϱ', 
  varsigma: 'ς', 
  varphi: 'φ', 
  digamma: 'ϝ', 
  
  
  /* Theorem */
  proposition: Unicode.render_if_exists('Proposition', 'textbf'),
  lemma: Unicode.render_if_exists('Lemma', 'textbf'),
  theorem: Unicode.render_if_exists('Theorem', 'textbf'),
  corollary: Unicode.render_if_exists('Corollary', 'textbf'),
  definition: Unicode.render_if_exists('Definition', 'textbf'),
  remark: Unicode.render_if_exists('Remark', 'textbf'),
  hypothesis: Unicode.render_if_exists('Hypothesis', 'textbf'),
  conjecture: Unicode.render_if_exists('Conjecture', 'textbf'),
  axiom: Unicode.render_if_exists('Axiom', 'textbf'),
  example: Unicode.render_if_exists('Example', 'textbf'),
  proof: Unicode.render_if_exists('proof', 'textit'),

  /* Combined Operatorname */
  argmax: 'arg max',
  argmin: 'arg min',
  injlim: 'inj lim',
  liminf: 'lim inf',
  limsup: 'lim sup',
  projlim: 'proj lim',


  /* Infix Names */ 
  infixs: [
    'plus',            'minus',         /* stub */
    'cdot',            'gtrdot',        'cdotp',
    'intercal',        'centerdot',     'land',
    'rhd',             'circ',          'leftthreetimes',
    'rightthreetimes', 'amalg',         'circledast',
    'ldotp',           'rtimes',        'And',
    'circledcirc',     'lor',           'setminus',
    'ast',             'circleddash',   'lessdot',
    'smallsetminus',   'barwedge',      'Cup',
    'lhd',             'sqcap',         'bigcirc',
    'cup',             'ltimes',        'sqcup',
    'bmod',            'curlyvee',      'mod',
    'times',           'boxdot',        'curlywedge',
    'mp',              'unlhd',         'boxminus',
    'div',             'odot',          'unrhd',
    'boxplus',         'divideontimes', 'ominus',
    'uplus',           'boxtimes',      'dotplus',
    'oplus',           'vee',           'bullet',
    'doublebarwedge',  'otimes',        'veebar',
    'Cap',             'doublecap',     'oslash',
    'wedge',           'cap',           'doublecup',
    'pm',              'plusmn',        'wr'
  ], 

  cdot: '⋅',
  cdotp: '⋅',

  dots: '…',
  cdots: '⋯',
  ldots: '…',
  ddots: '⋱',
  vdots: '⋮',

  prime: '′',
  Box: '□',
  S: '§',
  sect: '§',

  /* Delimiters */
  '|': '∥', 
  lang: '⟨', 
  rang: '⟩', 
  vert: '∣', 
  Vert: '∥', 
  lVert: '∥', 
  rVert: '∥', 
  lceil: '⌈', 
  rceil: '⌉', 
  lfloor: '⌊',
  rfloor: '⌋', 
  lmoustache: '⎰', 
  rmoustache: '⎱', 
  lgroup: '⟮', 
  rgroup: '⟯', 
  ulcorner: '┌', 
  urcorner: '┐', 
  llcorner: '└', 
  lrcorner: '┘', 
  llbracket: '[[', 
  rlbracket: ']]', 
  lBrace: '{[', 
  rBrace: ']}', 


  /* Big Operators */
  bigotimes: '⨂',
  bigvee: '⋁',
  bigoplus: '⨁',
  bigwedge: '⋀',
  bigodot: '⨀',
  bigcap: '⋂',
  biguplus: '⨄',
  bigcup: '⋃',
  bigsqcup: '⨆',

  wedge: '∧',
  curlywedge: '⋏',
  barwedge: '⊼', 
  doublebarwedge: '⩞',
  vee: '∨',
  curlyvee: '⋎',
  veebar: '⊻',
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

  uplus: '⊎', 
  divideontimes: '⋇', 

  lhd: '⊲',
  unlhd: '⊴',
  rhd: '⊳',
  unrhd: '⊵',
  setminus: '∖',
  smallsetminus: '∖',
  


  /* Block 79 : Mathematical Operators */
  forall: '∀',
  complement: '∁',
  partial: '∂',
  exist: '∃',
  exists: '∃',
  noexist: '∄',
  empty: '∅',
  emptyset: '∅',
  varnothing: '⌀', // u2300 diameter sign
  
  nabla: '∇',
  
  ni: '∋',
  
  blacksquare: '∎',
  prod: '∏',

  coprod: '∐',
  sum: '∑',
  plus: '+', 
  minus: '−',
  mp: '∓',
  dotplus: '∔',
  
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
  
  intclockwise: '∱',
  lcirclerightint: '∲',
  rcirclerightint: '∳',

  /* --- */

  nsimeq: '≄',
  congneq: '≆',
  

  eq: '=',
  ne: '≠',
  neq: '≠',
  
  triangleq: '≜',
  

  

  /* Relations */
  doteqdot: '≑',
  lessapprox: '⪅',
  smile: '⌣',
  eqcirc: '≖',
  lesseqgtr: '⋚',
  sqsubset: '⊏',
  eqcolon: '∹',
  minuscolon: '∹',
  lesseqqgtr: '⪋',
  sqsubseteq: '⊑',
  Eqcolon: '−∷',
  minuscoloncolon: '-∷',
  lessgtr: '≶',
  sqsupset: '⊐',
  approx: '≈',
  eqqcolon: '≕',
  equalscolon: '≕',
  lesssim: '≲',
  sqsupseteq: '⊒',
  approxcolon: '≈:',
  Eqqcolon: '=∷',
  equalscoloncolon: '=∷',
  ll: '≪',
  Subset: '⋐',
  approxcoloncolon: '≈∷',
  eqsim: '≂',
  lll: '⋘',
  subset: '⊂',
  sub: '⊂',
  approxeq: '≊',
  eqslantgtr: '⪖',
  llless: '⋘',
  subseteq: '⊆',
  sube: '⊆',
  asymp: '≍',
  eqslantless: '⪕',
  lt: '<',
  subseteqq: '⫅',
  backepsilon: '∍',
  equiv: '≡',
  // mid: '∣', 
  succ: '≻',
  backsim: '∽',
  fallingdotseq: '≒',
  models: '⊨',
  succapprox: '⪸',
  backsimeq: '⋍',
  frown: '⌢',
  multimap: '⊸',
  succcurlyeq: '≽',
  between: '≬',
  ge: '≥',
  origof: '⊶',
  succeq: '⪰',
  bowtie: '⋈',
  geq: '≥',
  owns: '∋',
  succsim: '≿',
  bumpeq: '≏',
  geqq: '≧',
  // parallel: '∥',
  Supset: '⋑',
  Bumpeq: '≎',
  geqslant: '⩾',
  perp: '⊥',
  supset: '⊃',
  // circeq: '≗',
  gg: '≫',
  pitchfork: '⋔',
  supseteq: '⊇',
  supe: '⊇',
  colonapprox: ':≈',
  ggg: '⋙',
  prec: '≺',
  supseteqq: '⫆',
  Colonapprox: '∷≈',
  coloncolonapprox: '∷≈',
  gggtr: '⋙',
  precapprox: '⪷',
  thickapprox: '≈',
  coloneq: ':−',
  colonminus: ':-',
  gt: '>',
  preccurlyeq: '≼',
  thicksim: '∼',
  Coloneq: '∷−',
  coloncolonminus: '∷−',
  gtrapprox: '⪆',
  preceq: '⪯',
  trianglelefteq: '⊴',
  coloneqq: '≔',
  colonequals: '≔',
  gtreqless: '⋛',
  precsim: '≾',
  // triangleq: '≜',
  Coloneqq: '∷=',
  coloncolonequals: '∷=',
  gtreqqless: '⪌',
  propto: '∝',
  trianglerighteq: '⊵',
  colonsim: ':∼',
  gtrless: '≷',
  risingdotseq: '≓',
  varpropto: '∝',
  Colonsim: '∷∼',
  coloncolonsim: '∷∼',
  gtrsim: '≳',
  shortmid: '∣',
  vartriangle: '△',
  cong: '≅',
  imageof: '⊷',
  shortparallel: '∥',
  vartriangleleft: '⊲',
  curlyeqprec: '⋞',
  in: '∈',
  isin: '∈',
  sim: '∼',
  vartriangleright: '⊳',
  curlyeqsucc: '⋟',
  Join: '⋈',
  simcolon: '∼:',
  vcentcolon: ':',
  ratio: ':',
  dashv: '⊣',
  le: '≤',
  simcoloncolon: '∼∷',
  vdash: '⊢',
  dblcolon: '∷',
  coloncolon: '∷',
  leq: '≤',
  simeq: '≃',
  vDash: '⊨',
  doteq: '≐',
  leqq: '≦',
  smallfrown: '⌢',
  Vdash: '⊩',
  Doteq: '≑',
  leqslant: '⩽',
  smallsmile: '⌣',
  Vvdash: '⊪',

  gnapprox: '⪊',
  ngeqslant: '≱',
  nsubseteq: '⊈',
  precneqq: '⪵',
  gneq: '⪈',
  ngtr: '≯',
  nsubseteqq: '⊈',
  precnsim: '⋨',
  gneqq: '≩',
  nleq: '≰',
  nsucc: '⊁',
  subsetneq: '⊊',
  gnsim: '⋧',
  nleqq: '≰',
  nsucceq: '⋡',
  subsetneqq: '⫋',
  gvertneqq: '≩',
  nleqslant: '≰',
  nsupseteq: '⊉',
  succnapprox: '⪺',
  lnapprox: '⪉',
  nless: '≮',
  nsupseteqq: '⊉',
  succneqq: '⪶',
  lneq: '⪇',
  // nmid: '∤',
  ntriangleleft: '⋪',
  succnsim: '⋩',
  lneqq: '≨',
  notin: '∉',
  ntrianglelefteq: '⋬',
  supsetneq: '⊋',
  lnsim: '⋦',
  notni: '∌',
  ntriangleright: '⋫',
  supsetneqq: '⫌',
  lvertneqq: '≨',
  // nparallel: '∦',
  ntrianglerighteq: '⋭',
  varsubsetneq: '⊊',
  ncong: '≆',
  nprec: '⊀',
  nvdash: '⊬',
  varsubsetneqq: '⫋',
  npreceq: '⋠',
  nvDash: '⊭',
  varsupsetneq: '⊋',
  // neq: '≠',
  nshortmid: '∤',
  nVDash: '⊯',
  varsupsetneqq: '⫌',
  ngeq: '≱',
  nshortparallel: '∦',
  nVdash: '⊮',
  ngeqq: '≱',
  nsim: '≁',
  precnapprox: '⪹',

  /* Arrows */

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
  div: '÷', 

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
  star: '⋆', 
  bigstar: '★', 
  Game: '⅁', 

  

  /* exp */
  sumtop: '⎲', 
  sumbottom: '⎳', 
  lbraceuend: '⎧', 
	lbracemid: '⎨', 
  lbracelend: '⎩', 
}

const operatornames = [
  'arcsin', 'arccos', 'arctan', 'arctg',
  'arcctg', 'arg',    'ch',     'cos',
  'det',    'gcd',    'inf',    'cosec',
  'cosh',   'cot',    'cotg',   'coth',
  'csc',    'ctg',    'cth',    'lim',
  'max',    'deg',    'dim',    'exp',
  'hom',    'ker',    'lg',     'ln',
  'log',    'min',    'plim',   'Pr',
  'sup',    'sec',    'sin',    'sinh',
  'sh',     'tan',    'tanh',   'tg',
  'th'
];
operatornames.forEach(x => Fixed[x] = x);


const greeks = [
  'Alpha',   'Beta',  'Gamma',   'Delta',
  'Epsilon', 'Zeta',  'Eta',     'Theta',
  'Iota',    'Kappa', 'Lambda',  'Mu',
  'Nu',      'Xi',    'Omicron', 'Pi',
  'Rho',     'Sigma', 'Tau',     'Upsilon',
  'Phi',     'Chi',   'Psi',     'Omega',
  'alpha',   'beta',  'gamma',   'delta',
  'epsilon', 'zeta',  'eta',     'theta',
  'iota',    'kappa', 'lambda',  'mu',
  'nu',      'xi',    'omicron', 'pi',
  'rho',     'sigma', 'tau',     'upsilon',
  'phi',     'chi',   'psi',     'omega'
]
greeks.forEach((x, i) => Fixed[x] = Unicode.greeks[i])
Fixed.epsilon = 'ϵ'


// fixed symbol as supscripts
Unicode.supscripts[Fixed.times] = Unicode.supscripts.x

// fixed symbol as subscripts
Unicode.subscripts[Fixed.in] = Fixed.smallin
Unicode.subscripts[Fixed.ni] = Fixed.smallni


// Gothic
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gothics = ['ahsa', 'bairkan', 'giba', 'dags', 'aihvus']


export default Fixed
