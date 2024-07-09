var UniTeX = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // unitex.js
  var unitex_exports = {};
  __export(unitex_exports, {
    binaries: () => binaries,
    fixeds: () => fixeds,
    getContext: () => getContext,
    parse: () => parse,
    unaries: () => unaries
  });

  // src/utils/link.js
  var proxy = (f) => function(...xs) {
    return f(this, ...xs);
  };
  var defined = (x) => x != void 0;
  var point = (x, f) => ({ x, y: f(x) });
  var Link = class _Link {
    constructor(run, chain = true) {
      this.run = run;
      this.chain = chain;
      this.suspend = () => this.chain = false;
      this.transfer = () => defined(this.next) ? this.next.chain = this.chain : true;
      this.make = (f) => (x) => this.transfer() ? f(x) : void 0;
      this.check = (predicate = defined) => this.next = new _Link((...xs) => ((x) => x.y ? x.x : (this.next.suspend(), void 0))(point(this.run(...xs), this.make(predicate))));
      this.pip = (next) => this.next = new _Link((...xs) => ((x) => defined(x.y) ? [x.x, x.y] : (this.next.suspend(), void 0))(point(this.run(...xs), this.make(next.run))));
      this.map = (morph) => this.next = new _Link((...xs) => this.make(morph)(this.run(...xs)));
    }
  };
  var link = (run) => new Link(run).check();

  // src/utils/proper.js
  var should_wrap = (x) => x.charAt() == "-" ? should_wrap(x.substring(1)) : x.length <= 1;
  var Proper = {};
  Proper.wrap = (ls, rs) => (x) => should_wrap(x) ? x : `${ls}${x}${rs}`;
  Proper.paren = Proper.wrap("(", ")");
  Proper.bracket = Proper.wrap("[", "]");
  Proper.brace = Proper.wrap("{", "}");
  var proper_default = Proper;

  // src/utils/unicode.js
  Number.prototype.boundedIn = proxy((x, a, b) => a <= x && x <= b);
  String.prototype.code = proxy((x) => x.codePointAt(0));
  String.prototype.boundedIn = proxy((x, a, b) => x.code().boundedIn(a.code(), b.code()));
  var Unicode = {
    typeface: {},
    isLetter: (x) => x.boundedIn("a", "z") || x.boundedIn("A", "Z"),
    series: function(a, b) {
      let [code1, code2] = [a.code(), b.code()];
      let length = code2 - code1 + 1;
      let codes = Array.from({ length }, (_, x) => x + code1);
      return String.fromCodePoint(...codes);
    },
    alphabets: function() {
      let map = new Object();
      Unicode.letterArray.forEach((x, i) => map[x] = arguments[i]);
      return map;
    },
    block: function(a, b, names) {
      let map = new Object();
      let data = Unicode.series(a, b);
      names.forEach((name, i) => name && (map[name] = data[i]));
      return map;
    },
    /**
     * Renders the given string if it exists, using the specified unicode typeface.
     *
     * @param {Array} s - The string to render.
     * @param {string} name - The name of the Unicode typeface to use.
     * @return {string} - The rendered string.
     */
    render_if_exists: (s, name) => Array.from(s).map((x) => Unicode.typeface[name][x] || x).join(""),
    /**
     * Checks if all characters in the given string are present in the charset object.
     *
     * @param {object} charset - The charset object containing the characters to check against.
     * @param {string} str - The string to be checked.
     * @param {function} otherwise - The callback function to be called if the characters are not present.
     * @return {boolean|string} Returns either true if all characters are present or the result of the otherwise callback.
     */
    render_if_forall: function(charset, str, otherwise = (x) => x) {
      const array = Array.from(str);
      let through = true;
      for (const element2 of array)
        through &&= charset[element2];
      return through ? array.map((x) => charset[x]).join("") : otherwise(str);
    },
    suprender: (s) => Unicode.render_if_forall(Unicode.supscripts, s, (x) => "^" + proper_default.brace(x)),
    subrender: (s) => Unicode.render_if_forall(Unicode.subscripts, s, (x) => "_" + proper_default.brace(x))
  };
  Unicode.letterUppers = Unicode.series("A", "Z");
  Unicode.letterLowers = Unicode.series("a", "z");
  Unicode.letters = Unicode.letterUppers + Unicode.letterLowers;
  Unicode.letterArray = Array.from(Unicode.letters);
  Unicode.greekUppers = Unicode.series("\u0391", "\u03A1") + Unicode.series("\u03A3", "\u03A9");
  Unicode.greekLowers = Unicode.series("\u03B1", "\u03C1") + Unicode.series("\u03C3", "\u03C9");
  Unicode.greeks = Unicode.greekUppers + Unicode.greekLowers;
  var series = Unicode.series;
  var alphabets = Unicode.alphabets;
  var typeface = function(name, alphabet) {
    Unicode.typeface[name] = alphabet;
  };
  typeface(
    "mathbb",
    alphabets(
      ..."\u{1D538}\u{1D539}\u2102",
      ...series("\u{1D53B}", "\u{1D53E}"),
      "\u210D",
      ...series("\u{1D540}", "\u{1D544}"),
      ..."\u2115\u{1D546}\u2119\u211A\u211D",
      ...series("\u{1D54A}", "\u{1D550}"),
      "\u2124",
      ...series("\u{1D552}", "\u{1D56B}")
    )
  );
  typeface("mathfrak", alphabets(...series("\u{1D56C}", "\u{1D59F}")));
  typeface(
    "mathscr",
    alphabets(
      ..."\u{1D49C}\u212C\u{1D49E}\u{1D49F}\u2130\u2131\u{1D4A2}\u210B\u2110\u{1D4A5}\u{1D4A6}\u2112\u2133",
      ...series("\u{1D4A9}", "\u{1D4AC}"),
      "\u211B",
      ...series("\u{1D4AE}", "\u{1D4B9}"),
      "\u212F",
      "\u{1D4BB}",
      "g",
      ...series("\u{1D4BD}", "\u{1D4C3}"),
      "\u2134",
      ...series("\u{1D4C5}", "\u{1D4CF}")
    )
  );
  typeface("mathcal", Unicode.typeface.mathscr);
  typeface("mathbf", alphabets(...series("\u{1D400}", "\u{1D433}")));
  typeface("mathit", alphabets(...series("\u{1D434}", "\u{1D454}"), "h", ...series("\u{1D456}", "\u{1D467}")));
  typeface("mathsf", alphabets(...series("\u{1D5A0}", "\u{1D5D3}")));
  typeface("textbf", Unicode.typeface.mathbf);
  typeface("textit", Unicode.typeface.mathit);
  typeface("textsf", Unicode.typeface.mathsf);
  typeface("texttt", alphabets(...series("\u{1D670}", "\u{1D6A3}")));
  typeface("textscr", Unicode.typeface.mathscr);
  typeface("textcal", Unicode.typeface.mathcal);
  typeface("sf", Unicode.typeface.mathsf);
  typeface("bf", Unicode.typeface.mathbf);
  typeface("bold", Unicode.typeface.mathbf);
  typeface("boldsymbol", Unicode.typeface.mathbf);
  typeface("bm", Unicode.typeface.mathbf);
  typeface("tt", Unicode.typeface.texttt);
  typeface("it", Unicode.typeface.mathit);
  typeface("frak", Unicode.typeface.mathfrak);
  typeface("cal", Unicode.typeface.mathcal);
  typeface("Bbb", Unicode.typeface.mathbb);
  Unicode.typefaceNames = Object.keys(Unicode.typeface);
  Unicode.supscripts = {};
  Unicode.supscripts[0] = "\u2070";
  Unicode.supscripts[1] = "\xB9";
  Unicode.supscripts[2] = "\xB2";
  Unicode.supscripts[3] = "\xB3";
  Unicode.supscripts[4] = "\u2074";
  Unicode.supscripts[5] = "\u2075";
  Unicode.supscripts[6] = "\u2076";
  Unicode.supscripts[7] = "\u2077";
  Unicode.supscripts[8] = "\u2078";
  Unicode.supscripts[9] = "\u2079";
  Unicode.supscripts.a = "\u1D43";
  Unicode.supscripts.b = "\u1D47";
  Unicode.supscripts.c = "\u1D9C";
  Unicode.supscripts.d = "\u1D48";
  Unicode.supscripts.e = "\u1D49";
  Unicode.supscripts.f = "\u1DA0";
  Unicode.supscripts.g = "\u1D4D";
  Unicode.supscripts.h = "\u02B0";
  Unicode.supscripts.j = "\u02B2";
  Unicode.supscripts.k = "\u1D4F";
  Unicode.supscripts.l = "\u02E1";
  Unicode.supscripts.m = "\u1D50";
  Unicode.supscripts.n = "\u207F";
  Unicode.supscripts.o = "\u1D52";
  Unicode.supscripts.p = "\u1D56";
  Unicode.supscripts.r = "\u02B3";
  Unicode.supscripts.s = "\u02E2";
  Unicode.supscripts.t = "\u1D57";
  Unicode.supscripts.u = "\u1D58";
  Unicode.supscripts.v = "\u1D5B";
  Unicode.supscripts.w = "\u02B7";
  Unicode.supscripts.x = "\u02E3";
  Unicode.supscripts.y = "\u02B8";
  Unicode.supscripts.z = "\u1DBB";
  Unicode.supscripts["+"] = "\u207A";
  Unicode.supscripts["-"] = "\u207B";
  Unicode.supscripts["="] = "\u207C";
  Unicode.supscripts["("] = "\u207D";
  Unicode.supscripts[")"] = "\u207E";
  Unicode.supscripts.A = "\u1D2C";
  Unicode.supscripts.B = "\u1D2E";
  Unicode.supscripts.D = "\u1D30";
  Unicode.supscripts.E = "\u1D31";
  Unicode.supscripts.G = "\u1D33";
  Unicode.supscripts.H = "\u1D34";
  Unicode.supscripts.I = "\u1D35";
  Unicode.supscripts.J = "\u1D36";
  Unicode.supscripts.K = "\u1D37";
  Unicode.supscripts.L = "\u1D38";
  Unicode.supscripts.M = "\u1D39";
  Unicode.supscripts.N = "\u1D3A";
  Unicode.supscripts["\u03B1"] = "\u1D45";
  Unicode.supscripts["\u2032"] = "\u2032";
  Unicode.subscripts = {};
  ["\u2080", "\u2081", "\u2082", "\u2083", "\u2084", "\u2085", "\u2086", "\u2087", "\u2088", "\u2089"].forEach((x, i) => Unicode.subscripts[i] = x);
  Unicode.subscripts.a = "\u2090";
  Unicode.subscripts.e = "\u2091";
  Unicode.subscripts.h = "\u2095";
  Unicode.subscripts.i = "\u1D62";
  Unicode.subscripts.j = "\u2C7C";
  Unicode.subscripts.k = "\u2096";
  Unicode.subscripts.l = "\u2097";
  Unicode.subscripts.m = "\u2098";
  Unicode.subscripts.n = "\u2099";
  Unicode.subscripts.o = "\u2092";
  Unicode.subscripts.p = "\u209A";
  Unicode.subscripts.r = "\u1D63";
  Unicode.subscripts.s = "\u209B";
  Unicode.subscripts.t = "\u209C";
  Unicode.subscripts.u = "\u1D64";
  Unicode.subscripts.v = "\u1D65";
  Unicode.subscripts.x = "\u2093";
  Unicode.subscripts["+"] = "\u208A";
  Unicode.subscripts["-"] = "\u208B";
  Unicode.subscripts["="] = "\u208C";
  Unicode.subscripts["("] = "\u208D";
  Unicode.subscripts[")"] = "\u208E";
  var unicode_default = Unicode;

  // src/utils/block.js
  var desired_length_string = function(s, n) {
    const residue = n - s.length;
    if (residue === 0)
      return s;
    if (residue > 0) {
      const left = Math.floor(residue / 2);
      const right = residue - left;
      return " ".repeat(left) + s + " ".repeat(right);
    }
    return s.substring(0, n);
  };
  var Block = class _Block {
    constructor(data, baseline = 0) {
      this.width = Math.max(...data.map((x) => x.length));
      this.height = data.length;
      this.data = data.map((x) => desired_length_string(x, this.width));
      this.string = this.data.join("\n");
      this.baseline = baseline;
      this.blocklift = function(n, offset) {
        const residue = n - this.height;
        if (residue == 0)
          return this;
        const topline = Array(offset).fill("");
        const bottomline = Array(residue - offset).fill("");
        return new _Block(topline.concat(this.data).concat(bottomline));
      };
      this.append = function(block) {
        const major = this.height > block.height;
        const supbase = this.baseline > block.baseline;
        const offset = supbase ? this.baseline - block.baseline : block.baseline - this.baseline;
        const baseline2 = supbase ? this.baseline : block.baseline;
        const [left, right] = major ? [this.data, block.blocklift(this.height, offset).data] : [this.blocklift(block.height, offset).data, block.data];
        return new _Block(left.map((v, i) => v + right[i]), baseline2);
      };
      this.add = (block) => this.append(_Block.plus).append(block);
      this.over = function(block) {
        const width = Math.max(this.width, block.width) + 2;
        const fracline = "-".repeat(width);
        const data2 = [...this.data, fracline, ...block.data];
        return new _Block(data2.map((x) => desired_length_string(x, width)), this.height);
      };
    }
    static of(s) {
      return s.toBlock();
    }
  };
  String.prototype.toBlock = function() {
    return new Block([this]);
  };
  Block.empty = "".toBlock();
  Block.plus = " + ".toBlock();
  var fracByString = function(x, y) {
    const width = Math.max(x.length, y.length) + 2;
    const data = [x.fill(width), "-".repeat(width), y.fill(width)];
    return new Block(data, 1);
  };
  var frac = function(a, b) {
    if (a instanceof Block && b instanceof Block)
      return a.over(b);
    if (typeof a == "string" && typeof b == "string")
      return fracByString(a, b);
    if (typeof a == "string")
      return frac(new Block([a]), b);
    if (typeof b == "string")
      return frac(a, new Block([b]));
  };
  Block.frac = frac;
  String.prototype.add = function(x) {
    const other = typeof x == "string" ? x.toBlock() : x;
    return this.toBlock().add(other);
  };
  var block_default = Block;

  // src/macro/fixed.js
  var Fixed = {
    N: unicode_default.typeface.mathbb.N,
    Z: unicode_default.typeface.mathbb.Z,
    Q: unicode_default.typeface.mathbb.Q,
    R: unicode_default.typeface.mathbb.R,
    C: unicode_default.typeface.mathbb.C,
    CC: unicode_default.typeface.mathbb.C,
    A: unicode_default.typeface.mathbb.A,
    F: unicode_default.typeface.mathbb.F,
    SS: unicode_default.typeface.mathbb.S,
    natnums: unicode_default.typeface.mathbb.N,
    reals: unicode_default.typeface.mathbb.R,
    Reals: unicode_default.typeface.mathbb.R,
    cnums: unicode_default.typeface.mathbb.C,
    Complex: unicode_default.typeface.mathbb.C,
    Bbbk: unicode_default.typeface.mathbb.k,
    /**
     * In order to express my respect to all TeX-related project developers, 
     * I reserve these special macro commands and follow the consistent tradition 
     * to implement UniTeX.
     */
    TeX: "T\u1D07X",
    LaTeX: "L\u1D2CT\u1D07X",
    KaTeX: "K\u1D2CT\u1D07X",
    UniTeX: "U\u207F\u1D62T\u1D07X",
    Agda: "\u{1D434}gda",
    Lean: "L\u2203\u2200N",
    /* Accents */
    hat: "\u0302",
    tilde: "\u0303",
    bar: "\u0304",
    overline: "\u0305",
    breve: "\u0306",
    widetilde: "\u0360",
    uwidebreve: "\u035C",
    widebreve: "\u035D",
    widepreve: "\u0361",
    uvec: "\u0362",
    /* Frequent */
    degree: "\xB0",
    /* Variant */
    varGamma: "\u0393",
    varDelta: "\u0394",
    varTheta: "\u0398",
    varLambda: "\u039B",
    varXi: "\u039E",
    varPi: "\u03D6",
    varSigma: "\u03A3",
    varUpsilon: "\u03A5",
    varPhi: "\u03A6",
    varPsi: "\u03A8",
    varOmega: "\u03A9",
    varepsilon: "\u03B5",
    varkappa: "\u03F0",
    vartheta: "\u03D1",
    thetasym: "\u03D1",
    varpi: "\u03D6",
    varrho: "\u03F1",
    varsigma: "\u03C2",
    varphi: "\u03C6",
    digamma: "\u03DD",
    /* Theorem */
    proposition: unicode_default.render_if_exists("Proposition", "textbf"),
    lemma: unicode_default.render_if_exists("Lemma", "textbf"),
    theorem: unicode_default.render_if_exists("Theorem", "textbf"),
    corollary: unicode_default.render_if_exists("Corollary", "textbf"),
    definition: unicode_default.render_if_exists("Definition", "textbf"),
    remark: unicode_default.render_if_exists("Remark", "textbf"),
    hypothesis: unicode_default.render_if_exists("Hypothesis", "textbf"),
    conjecture: unicode_default.render_if_exists("Conjecture", "textbf"),
    axiom: unicode_default.render_if_exists("Axiom", "textbf"),
    example: unicode_default.render_if_exists("Example", "textbf"),
    proof: unicode_default.render_if_exists("proof", "textit"),
    /* Combined Operatorname */
    argmax: "arg max",
    argmin: "arg min",
    injlim: "inj lim",
    liminf: "lim inf",
    limsup: "lim sup",
    projlim: "proj lim",
    /* Infix Names */
    infixs: [
      "plus",
      "minus",
      /* stub */
      "cdot",
      "gtrdot",
      "cdotp",
      "intercal",
      "centerdot",
      "land",
      "rhd",
      "circ",
      "leftthreetimes",
      "rightthreetimes",
      "amalg",
      "circledast",
      "ldotp",
      "rtimes",
      "And",
      "circledcirc",
      "lor",
      "setminus",
      "ast",
      "circleddash",
      "lessdot",
      "smallsetminus",
      "barwedge",
      "Cup",
      "lhd",
      "sqcap",
      "bigcirc",
      "cup",
      "ltimes",
      "sqcup",
      "bmod",
      "curlyvee",
      "mod",
      "times",
      "boxdot",
      "curlywedge",
      "mp",
      "unlhd",
      "boxminus",
      "div",
      "odot",
      "unrhd",
      "boxplus",
      "divideontimes",
      "ominus",
      "uplus",
      "boxtimes",
      "dotplus",
      "oplus",
      "vee",
      "bullet",
      "doublebarwedge",
      "otimes",
      "veebar",
      "Cap",
      "doublecap",
      "oslash",
      "wedge",
      "cap",
      "doublecup",
      "pm",
      "plusmn",
      "wr"
    ],
    cdot: "\u22C5",
    cdotp: "\u22C5",
    dots: "\u2026",
    cdots: "\u22EF",
    ldots: "\u2026",
    ddots: "\u22F1",
    vdots: "\u22EE",
    prime: "\u2032",
    Box: "\u25A1",
    S: "\xA7",
    sect: "\xA7",
    /* Delimiters */
    "|": "\u2225",
    lang: "\u27E8",
    rang: "\u27E9",
    vert: "\u2223",
    Vert: "\u2225",
    lVert: "\u2225",
    rVert: "\u2225",
    lceil: "\u2308",
    rceil: "\u2309",
    lfloor: "\u230A",
    rfloor: "\u230B",
    lmoustache: "\u23B0",
    rmoustache: "\u23B1",
    lgroup: "\u27EE",
    rgroup: "\u27EF",
    ulcorner: "\u250C",
    urcorner: "\u2510",
    llcorner: "\u2514",
    lrcorner: "\u2518",
    llbracket: "[[",
    rlbracket: "]]",
    lBrace: "{[",
    rBrace: "]}",
    /* Big Operators */
    bigotimes: "\u2A02",
    bigvee: "\u22C1",
    bigoplus: "\u2A01",
    bigwedge: "\u22C0",
    bigodot: "\u2A00",
    bigcap: "\u22C2",
    biguplus: "\u2A04",
    bigcup: "\u22C3",
    bigsqcup: "\u2A06",
    wedge: "\u2227",
    curlywedge: "\u22CF",
    barwedge: "\u22BC",
    doublebarwedge: "\u2A5E",
    vee: "\u2228",
    curlyvee: "\u22CE",
    veebar: "\u22BB",
    sqcap: "\u2293",
    sqcup: "\u2294",
    boxdot: "\u22A1",
    boxplus: "\u229E",
    boxminus: "\u229F",
    boxtimes: "\u22A0",
    oplus: "\u2295",
    ominus: "\u2296",
    otimes: "\u2297",
    oslash: "\u2298",
    uplus: "\u228E",
    divideontimes: "\u22C7",
    lhd: "\u22B2",
    unlhd: "\u22B4",
    rhd: "\u22B3",
    unrhd: "\u22B5",
    setminus: "\u2216",
    smallsetminus: "\u2216",
    /* Block 79 : Mathematical Operators */
    forall: "\u2200",
    complement: "\u2201",
    partial: "\u2202",
    exist: "\u2203",
    exists: "\u2203",
    noexist: "\u2204",
    empty: "\u2205",
    emptyset: "\u2205",
    varnothing: "\u2300",
    // u2300 diameter sign
    nabla: "\u2207",
    ni: "\u220B",
    blacksquare: "\u220E",
    prod: "\u220F",
    coprod: "\u2210",
    sum: "\u2211",
    plus: "+",
    minus: "\u2212",
    mp: "\u2213",
    dotplus: "\u2214",
    backslash: "\u2216",
    ast: "\u2217",
    circ: "\u2218",
    bullet: "\u2219",
    infty: "\u221E",
    infin: "\u221E",
    mid: "\u2223",
    nmid: "\u2224",
    parallel: "\u2225",
    nparallel: "\u2226",
    land: "\u2227",
    lor: "\u2228",
    cap: "\u2229",
    cup: "\u222A",
    int: "\u222B",
    iint: "\u222C",
    iiint: "\u222D",
    iiiint: "\u2A0C",
    oint: "\u222E",
    oiint: "\u222F",
    oiiint: "\u2230",
    intclockwise: "\u2231",
    lcirclerightint: "\u2232",
    rcirclerightint: "\u2233",
    /* --- */
    nsimeq: "\u2244",
    congneq: "\u2246",
    eq: "=",
    ne: "\u2260",
    neq: "\u2260",
    triangleq: "\u225C",
    /* Relations */
    doteqdot: "\u2251",
    lessapprox: "\u2A85",
    smile: "\u2323",
    eqcirc: "\u2256",
    lesseqgtr: "\u22DA",
    sqsubset: "\u228F",
    eqcolon: "\u2239",
    minuscolon: "\u2239",
    lesseqqgtr: "\u2A8B",
    sqsubseteq: "\u2291",
    Eqcolon: "\u2212\u2237",
    minuscoloncolon: "-\u2237",
    lessgtr: "\u2276",
    sqsupset: "\u2290",
    approx: "\u2248",
    eqqcolon: "\u2255",
    equalscolon: "\u2255",
    lesssim: "\u2272",
    sqsupseteq: "\u2292",
    approxcolon: "\u2248:",
    Eqqcolon: "=\u2237",
    equalscoloncolon: "=\u2237",
    ll: "\u226A",
    Subset: "\u22D0",
    approxcoloncolon: "\u2248\u2237",
    eqsim: "\u2242",
    lll: "\u22D8",
    subset: "\u2282",
    sub: "\u2282",
    approxeq: "\u224A",
    eqslantgtr: "\u2A96",
    llless: "\u22D8",
    subseteq: "\u2286",
    sube: "\u2286",
    asymp: "\u224D",
    eqslantless: "\u2A95",
    lt: "<",
    subseteqq: "\u2AC5",
    backepsilon: "\u220D",
    equiv: "\u2261",
    // mid: '∣', 
    succ: "\u227B",
    backsim: "\u223D",
    fallingdotseq: "\u2252",
    models: "\u22A8",
    succapprox: "\u2AB8",
    backsimeq: "\u22CD",
    frown: "\u2322",
    multimap: "\u22B8",
    succcurlyeq: "\u227D",
    between: "\u226C",
    ge: "\u2265",
    origof: "\u22B6",
    succeq: "\u2AB0",
    bowtie: "\u22C8",
    geq: "\u2265",
    owns: "\u220B",
    succsim: "\u227F",
    bumpeq: "\u224F",
    geqq: "\u2267",
    // parallel: '∥',
    Supset: "\u22D1",
    Bumpeq: "\u224E",
    geqslant: "\u2A7E",
    perp: "\u22A5",
    supset: "\u2283",
    // circeq: '≗',
    gg: "\u226B",
    pitchfork: "\u22D4",
    supseteq: "\u2287",
    supe: "\u2287",
    colonapprox: ":\u2248",
    ggg: "\u22D9",
    prec: "\u227A",
    supseteqq: "\u2AC6",
    Colonapprox: "\u2237\u2248",
    coloncolonapprox: "\u2237\u2248",
    gggtr: "\u22D9",
    precapprox: "\u2AB7",
    thickapprox: "\u2248",
    coloneq: ":\u2212",
    colonminus: ":-",
    gt: ">",
    preccurlyeq: "\u227C",
    thicksim: "\u223C",
    Coloneq: "\u2237\u2212",
    coloncolonminus: "\u2237\u2212",
    gtrapprox: "\u2A86",
    preceq: "\u2AAF",
    trianglelefteq: "\u22B4",
    coloneqq: "\u2254",
    colonequals: "\u2254",
    gtreqless: "\u22DB",
    precsim: "\u227E",
    // triangleq: '≜',
    Coloneqq: "\u2237=",
    coloncolonequals: "\u2237=",
    gtreqqless: "\u2A8C",
    propto: "\u221D",
    trianglerighteq: "\u22B5",
    colonsim: ":\u223C",
    gtrless: "\u2277",
    risingdotseq: "\u2253",
    varpropto: "\u221D",
    Colonsim: "\u2237\u223C",
    coloncolonsim: "\u2237\u223C",
    gtrsim: "\u2273",
    shortmid: "\u2223",
    vartriangle: "\u25B3",
    cong: "\u2245",
    imageof: "\u22B7",
    shortparallel: "\u2225",
    vartriangleleft: "\u22B2",
    curlyeqprec: "\u22DE",
    in: "\u2208",
    isin: "\u2208",
    sim: "\u223C",
    vartriangleright: "\u22B3",
    curlyeqsucc: "\u22DF",
    Join: "\u22C8",
    simcolon: "\u223C:",
    vcentcolon: ":",
    ratio: ":",
    dashv: "\u22A3",
    le: "\u2264",
    simcoloncolon: "\u223C\u2237",
    vdash: "\u22A2",
    dblcolon: "\u2237",
    coloncolon: "\u2237",
    leq: "\u2264",
    simeq: "\u2243",
    vDash: "\u22A8",
    doteq: "\u2250",
    leqq: "\u2266",
    smallfrown: "\u2322",
    Vdash: "\u22A9",
    Doteq: "\u2251",
    leqslant: "\u2A7D",
    smallsmile: "\u2323",
    Vvdash: "\u22AA",
    gnapprox: "\u2A8A",
    ngeqslant: "\u2271",
    nsubseteq: "\u2288",
    precneqq: "\u2AB5",
    gneq: "\u2A88",
    ngtr: "\u226F",
    nsubseteqq: "\u2288",
    precnsim: "\u22E8",
    gneqq: "\u2269",
    nleq: "\u2270",
    nsucc: "\u2281",
    subsetneq: "\u228A",
    gnsim: "\u22E7",
    nleqq: "\u2270",
    nsucceq: "\u22E1",
    subsetneqq: "\u2ACB",
    gvertneqq: "\u2269",
    nleqslant: "\u2270",
    nsupseteq: "\u2289",
    succnapprox: "\u2ABA",
    lnapprox: "\u2A89",
    nless: "\u226E",
    nsupseteqq: "\u2289",
    succneqq: "\u2AB6",
    lneq: "\u2A87",
    // nmid: '∤',
    ntriangleleft: "\u22EA",
    succnsim: "\u22E9",
    lneqq: "\u2268",
    notin: "\u2209",
    neg: "\xAC",
    lnot: "\xAC",
    ntrianglelefteq: "\u22EC",
    supsetneq: "\u228B",
    lnsim: "\u22E6",
    notni: "\u220C",
    ntriangleright: "\u22EB",
    supsetneqq: "\u2ACC",
    lvertneqq: "\u2268",
    // nparallel: '∦',
    ntrianglerighteq: "\u22ED",
    varsubsetneq: "\u228A",
    ncong: "\u2246",
    nprec: "\u2280",
    nvdash: "\u22AC",
    varsubsetneqq: "\u2ACB",
    npreceq: "\u22E0",
    nvDash: "\u22AD",
    varsupsetneq: "\u228B",
    // neq: '≠',
    nshortmid: "\u2224",
    nVDash: "\u22AF",
    varsupsetneqq: "\u2ACC",
    ngeq: "\u2271",
    nshortparallel: "\u2226",
    nVdash: "\u22AE",
    ngeqq: "\u2271",
    nsim: "\u2241",
    precnapprox: "\u2AB9",
    /* Arrows */
    circlearrowleft: "\u21BA",
    leftharpoonup: "\u21BC",
    rArr: "\u21D2",
    circlearrowright: "\u21BB",
    leftleftarrows: "\u21C7",
    rarr: "\u2192",
    curvearrowleft: "\u21B6",
    leftrightarrow: "\u2194",
    restriction: "\u21BE",
    curvearrowright: "\u21B7",
    Leftrightarrow: "\u21D4",
    rightarrow: "\u2192",
    Darr: "\u21D3",
    leftrightarrows: "\u21C6",
    Rightarrow: "\u21D2",
    dArr: "\u21D3",
    leftrightharpoons: "\u21CB",
    rightarrowtail: "\u21A3",
    darr: "\u2193",
    leftrightsquigarrow: "\u21AD",
    rightharpoondown: "\u21C1",
    dashleftarrow: "\u21E0",
    Lleftarrow: "\u21DA",
    rightharpoonup: "\u21C0",
    dashrightarrow: "\u21E2",
    longleftarrow: "\u27F5",
    rightleftarrows: "\u21C4",
    downarrow: "\u2193",
    Longleftarrow: "\u27F8",
    rightleftharpoons: "\u21CC",
    Downarrow: "\u21D3",
    longleftrightarrow: "\u27F7",
    rightrightarrows: "\u21C9",
    downdownarrows: "\u21CA",
    Longleftrightarrow: "\u27FA",
    rightsquigarrow: "\u21DD",
    downharpoonleft: "\u21C3",
    longmapsto: "\u27FC",
    Rrightarrow: "\u21DB",
    downharpoonright: "\u21C2",
    longrightarrow: "\u27F6",
    Rsh: "\u21B1",
    gets: "\u2190",
    Longrightarrow: "\u27F9",
    searrow: "\u2198",
    Harr: "\u21D4",
    looparrowleft: "\u21AB",
    swarrow: "\u2199",
    hArr: "\u21D4",
    looparrowright: "\u21AC",
    to: "\u2192",
    harr: "\u2194",
    Lrarr: "\u21D4",
    twoheadleftarrow: "\u219E",
    hookleftarrow: "\u21A9",
    lrArr: "\u21D4",
    twoheadrightarrow: "\u21A0",
    hookrightarrow: "\u21AA",
    lrarr: "\u2194",
    Uarr: "\u21D1",
    iff: "\u27FA",
    Lsh: "\u21B0",
    uArr: "\u21D1",
    impliedby: "\u27F8",
    mapsto: "\u21A6",
    uarr: "\u2191",
    implies: "\u27F9",
    nearrow: "\u2197",
    uparrow: "\u2191",
    Larr: "\u21D0",
    nleftarrow: "\u219A",
    Uparrow: "\u21D1",
    lArr: "\u21D0",
    nLeftarrow: "\u21CD",
    updownarrow: "\u2195",
    larr: "\u2190",
    nleftrightarrow: "\u21AE",
    Updownarrow: "\u21D5",
    leadsto: "\u21DD",
    nLeftrightarrow: "\u21CE",
    upharpoonleft: "\u21BF",
    leftarrow: "\u2190",
    nrightarrow: "\u219B",
    upharpoonright: "\u21BE",
    Leftarrow: "\u21D0",
    nRightarrow: "\u21CF",
    upuparrows: "\u21C8",
    leftarrowtail: "\u21A2",
    nwarrow: "\u2196",
    leftharpoondown: "\u21BD",
    Rarr: "\u21D2",
    pm: "\xB1",
    plusmn: "\xB1",
    times: "\xD7",
    ltimes: "\u22C9",
    rtimes: "\u22CA",
    div: "\xF7",
    aleph: "\u2135",
    alef: "\u2135",
    alefsym: "\u2135",
    ell: "\u2113",
    wp: "\u2118",
    weierp: "\u2118",
    /* Spacing */
    ",": " ",
    ">": " ",
    ":": " ",
    ";": " ".repeat(2),
    "!": "",
    // stub
    quad: " ".repeat(4),
    qquad: " ".repeat(6),
    thinspace: " ",
    medspace: " ",
    thickspace: " ".repeat(2),
    enspace: " ".repeat(2),
    negthickspace: "",
    // stub
    negthinspace: "",
    // stub
    negmedspace: "",
    // stub
    "(": "(",
    ")": ")",
    "[": "[",
    "]": "]",
    "{": "{",
    "}": "}",
    "_": "_",
    "%": "%",
    "\\": "\n",
    "newline": "\n",
    /* Symbols and Punctuation */
    surd: "\u221A",
    checkmark: "\u2713",
    top: "\u22A4",
    bot: "\u22A5",
    mho: "\u2127",
    star: "\u22C6",
    bigstar: "\u2605",
    Game: "\u2141",
    because: "\u2235",
    suchthat: "\u2234",
    /* Extensions */
    sumtop: "\u23B2",
    sumbottom: "\u23B3",
    lbraceuend: "\u23A7",
    lbracemid: "\u23A8",
    lbracelend: "\u23A9"
  };
  var operatornames = [
    "arcsin",
    "arccos",
    "arctan",
    "arctg",
    "arcctg",
    "arg",
    "ch",
    "cos",
    "det",
    "gcd",
    "inf",
    "cosec",
    "cosh",
    "cot",
    "cotg",
    "coth",
    "csc",
    "ctg",
    "cth",
    "lim",
    "max",
    "deg",
    "dim",
    "exp",
    "hom",
    "ker",
    "lg",
    "ln",
    "log",
    "min",
    "plim",
    "Pr",
    "sup",
    "sec",
    "sin",
    "sinh",
    "sh",
    "tan",
    "tanh",
    "tg",
    "th"
  ];
  operatornames.forEach((x) => Fixed[x] = x);
  var greeks = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
    "Iota",
    "Kappa",
    "Lambda",
    "Mu",
    "Nu",
    "Xi",
    "Omicron",
    "Pi",
    "Rho",
    "Sigma",
    "Tau",
    "Upsilon",
    "Phi",
    "Chi",
    "Psi",
    "Omega",
    "alpha",
    "beta",
    "gamma",
    "delta",
    "epsilon",
    "zeta",
    "eta",
    "theta",
    "iota",
    "kappa",
    "lambda",
    "mu",
    "nu",
    "xi",
    "omicron",
    "pi",
    "rho",
    "sigma",
    "tau",
    "upsilon",
    "phi",
    "chi",
    "psi",
    "omega"
  ];
  greeks.forEach((x, i) => Fixed[x] = unicode_default.greeks[i]);
  Fixed.epsilon = "\u03F5";
  unicode_default.supscripts[Fixed.times] = unicode_default.supscripts.x;
  unicode_default.subscripts[Fixed.in] = Fixed.smallin;
  unicode_default.subscripts[Fixed.ni] = Fixed.smallni;
  var fixed_default = Fixed;

  // src/macro/binary.js
  var oversetEquationMap = {
    "?=": fixed_default.qeq,
    "m=": fixed_default.meq,
    "def=": fixed_default.defeq,
    // from unimath, wait hook style
    [fixed_default["star"] + "="]: fixed_default["stareq"],
    [fixed_default["Delta"] + "="]: fixed_default["deltaeq"]
  };
  var Binary = {
    frac: (x, y) => `${proper_default.paren(x)}/${proper_default.paren(y)}`,
    overset: (x, y) => oversetEquationMap[`${x}${y}`] || `\\overset{${x}}{${y}}`,
    binom: (n, k) => `(${n} ${k})`,
    /* unstable */
    alias: (a, x) => (fixed_default[a] = x, "")
  };
  var BinaryBlock = {
    frac: (x, y) => block_default.frac(x, y),
    overset: (x, y) => Binary.overset(x.string, y.string).toBlock()
  };
  var BinaryInfix = {
    choose: (n, k) => Binary.binom(n, k)
  };
  Binary["cfrac"] = Binary.frac;
  Binary["dfrac"] = Binary.frac;
  Binary["tfrac"] = Binary.frac;
  Binary["dbinom"] = Binary.binom;
  Binary["tbinom"] = Binary.binom;
  BinaryBlock["cfrac"] = BinaryBlock.frac;
  BinaryBlock["dfrac"] = BinaryBlock.frac;
  BinaryBlock["tfrac"] = BinaryBlock.frac;
  var binary_default = Binary;

  // src/macro/unary.js
  var unchecked_accents = (unicode) => (x) => `${x}${unicode}`;
  var Unary = {
    id: (x) => x,
    text: (x) => x,
    mathrm: (x) => x,
    sqrt: (x) => "\u221A" + proper_default.paren(x),
    cbrt: (x) => "\u221B" + proper_default.paren(x),
    // original
    furt: (x) => "\u221C" + proper_default.paren(x),
    // original
    grave: (x) => x + (unicode_default.isLetter(x) ? "\u0300" : "-grave"),
    "`": unchecked_accents("\u0300"),
    acute: (x) => x + (unicode_default.isLetter(x) ? "\u0301" : "-acute"),
    "'": unchecked_accents("\u0301"),
    hat: (x) => x + (unicode_default.isLetter(x) ? "\u0302" : "-hat"),
    "^": unchecked_accents("\u0302"),
    tilde: (x) => x + (unicode_default.isLetter(x) ? "\u0303" : "-tilde"),
    "~": unchecked_accents("\u0303"),
    bar: (x) => x + (unicode_default.isLetter(x) ? "\u0304" : "-bar"),
    "=": unchecked_accents("\u0304"),
    overline: (x) => x + (unicode_default.isLetter(x) ? "\u0305" : "-underline"),
    breve: (x) => x + (unicode_default.isLetter(x) ? "\u0306" : "-breve"),
    u: unchecked_accents("\u0306"),
    ".": unchecked_accents("\u0307"),
    '"': unchecked_accents("\u0308"),
    r: unchecked_accents("\u030A"),
    H: unchecked_accents("\u030B"),
    v: unchecked_accents("\u030C"),
    not: unchecked_accents("\u0338"),
    kern: (x) => x.endsWith("em") ? " ".repeat(x.substring(0, x.length - 2)) : " "
  };
  var UnaryOptional = {
    sqrt: (n, x) => {
      switch (n) {
        case 2:
          return Unary.sqrt(x);
        case 3:
          return Unary.cbrt(x);
        case 4:
          return Unary.furt(x);
        default:
          return unicode_default.suprender(n) + Unary.sqrt(x);
      }
    }
  };
  Unary.mkern = Unary.kern;
  Unary.mskip = Unary.kern;
  Unary.hskip = Unary.kern;
  Unary.hspace = Unary.kern;
  unicode_default.typefaceNames.forEach((x) => Unary[x] = (s) => unicode_default.render_if_exists(s, x));
  Unary.typefaceNames = ["text", "mathrm", ...unicode_default.typefaceNames];
  var unary_default = Unary;

  // src/macro/environment.js
  var Environment = {
    // matrix family
    matrix: (xs) => sepMatrix(xs, " ", " ", "; "),
    smallmatrix: (xs) => sepMatrix(xs, " ", " ", "; "),
    bmatrix: (xs) => regMatrix(xs, "[", "]"),
    pmatrix: (xs) => regMatrix(xs, "(", ")"),
    vmatrix: (xs) => sepMatrix(xs, "|", "|", "; "),
    Bmatrix: (xs) => regMatrix(xs, "{", "}"),
    Vmatrix: (xs) => sepMatrix(xs, "||", "||", "; "),
    // theorem family
    proposition: (xs) => theorem_style("proposition", xs),
    lemma: (xs) => theorem_style("lemma", xs),
    theorem: (xs) => theorem_style("theorem", xs),
    corollary: (xs) => theorem_style("corollary", xs),
    definition: (xs) => theorem_style("definition", xs),
    remark: (xs) => theorem_style("remark", xs),
    hypothesis: (xs) => theorem_style("hypothesis", xs),
    conjecture: (xs) => theorem_style("conjecture", xs),
    axiom: (xs) => theorem_style("axiom", xs),
    example: (xs) => theorem_style("example", xs),
    proof: (xs) => theorem_style("proof", xs)
    // misc family
    // center: xs => xs,
    // document: xs => xs,
  };
  var doubleBackslash = "\\\\";
  var matrim = (x) => x.replace(/\s/g, "").replace(/&/g, " ");
  var regMatrix = function(gel, ls, rs, lg = ls, rg = rs) {
    const xs = gel.split(doubleBackslash);
    const s = "".concat(...xs.map((x) => ls + matrim(x) + rs));
    return xs.length > 1 ? lg + s + rg : s;
  };
  var sepMatrix = function(gel, lg, rg, sep) {
    const xs = gel.split(doubleBackslash);
    return lg + xs.map(matrim).join(sep) + rg;
  };
  var polymerize_tex = function(s) {
    let result = s.trim().replace(/ *\r\n *| *\n *| (?= )/g, "").replace(/ *(,|\.) */g, "$1 ");
    return result;
  };
  var regexpDoubleLine = /\r\n\r\n|\n\n/;
  var theorem_style = function(type, content) {
    let title = fixed_default[type] + ". ";
    return title + content.split(regexpDoubleLine).map(polymerize_tex).join("\n");
  };
  var environment_default = Environment;

  // src/parsec.js
  var Parser = function(parse2) {
    this.parse = parse2;
  };
  Parser.create = (parse2) => new Parser(parse2);
  Parser.prototype.many = function() {
    return new Parser((source) => {
      let [list, residue, tuple] = [[], source];
      while (tuple = this.parse(residue)) {
        list.push(tuple[0]);
        residue = tuple[1];
      }
      return [list, residue];
    });
  };
  Parser.prototype.some = function() {
    return new Parser((source) => {
      let tuple = this.many().parse(source);
      return tuple[0].length >= 1 ? tuple : void 0;
    });
  };
  Parser.prototype.asterisk = function() {
    return new Parser((source) => {
      let [buffer, residue, tuple] = ["", source];
      while (tuple = this.parse(residue)) {
        buffer += tuple[0];
        residue = tuple[1];
      }
      return [buffer, residue];
    });
  };
  Parser.prototype.plus = function() {
    return new Parser((source) => {
      let tuple = this.asterisk().parse(source);
      return tuple[0].length >= 1 ? tuple : void 0;
    });
  };
  Parser.prototype.map = function(morph) {
    return new Parser(
      (source) => link(() => this.parse(source)).map((xs) => [morph(xs[0]), xs[1]]).run()
    );
  };
  Parser.prototype.first = proxy((x) => x.map((tuple) => tuple[0]));
  Parser.prototype.second = proxy((x) => x.map((tuple) => tuple[1]));
  Function.prototype.parse = proxy((x, s) => x().parse(s));
  Parser.prototype.follow = function(next) {
    return new Parser(
      (source) => link(() => this.parse(source)).pip(link((xs) => next.parse(xs[1]))).map((xs) => [[xs[0][0], xs[1][0]], xs[1][1]]).run()
    );
  };
  Parser.prototype.follows = function() {
    return [...arguments].reduce((prev, curr) => prev.follow(curr), this);
  };
  Parser.prototype.skip = function(next) {
    return new Parser(
      (source) => link(() => this.parse(source)).pip(link((xs) => next.parse(xs[1]))).map((xs) => [xs[0][0], xs[1][1]]).run()
    );
  };
  Parser.prototype.move = function(next) {
    return new Parser(
      (source) => link(() => this.parse(source)).pip(link((xs) => next.parse(xs[1]))).map((xs) => xs[1]).run()
    );
  };
  Parser.prototype.check = function(predicate) {
    return new Parser(
      (source) => link(() => this.parse(source)).check((x) => predicate(...x)).run()
    );
  };
  Parser.prototype.or = function(next) {
    return new Parser(
      (source) => this.parse(source) || next.parse(source)
    );
  };
  Parser.prototype.log = function(s) {
    return this.map((x) => (console.log(s + x), x));
  };
  var token = (predicate) => new Parser(
    (source) => source.length > 0 ? predicate(source[0]) ? [source[0], source.substring(1)] : void 0 : void 0
  );
  var character = (char) => token((x) => x == char);
  var includes = (...xs) => token((x) => xs.includes(x));
  var string = (str) => new Parser(
    (source) => source.length >= str.length ? source.startsWith(str) ? [str, source.substring(str.length)] : void 0 : void 0
  );
  var space = character(" ");
  var spacea = space.asterisk();
  var spaces = space.plus();
  var loose = (x) => spacea.follow(x).second();
  Number.prototype.boundedIn = proxy((x, a, b) => a <= x && x <= b);
  String.prototype.code = proxy((x) => x.codePointAt(0));
  String.prototype.boundedIn = proxy((x, a, b) => x.code().boundedIn(a.code(), b.code()));
  var digit = token((x) => x.boundedIn("0", "9"));
  var digits = digit.plus();
  var letter = token((x) => x.boundedIn("a", "z") || x.boundedIn("A", "Z"));
  var letters = letter.plus();

  // src/context/extension.js
  var ExtensionLoader = {
    load: function(extension) {
      const { fixed, unary, binary } = extension;
      fixed && Object.keys(fixed).forEach((x) => fixed_default[x] = fixed[x]);
      unary && Object.keys(unary).forEach((x) => unary_default[x] = unary[x]);
      binary && Object.keys(binary).forEach((x) => binary_default[x] = binary[x]);
    },
    // except link format `https://xxx/xxxx.js`
    loadHttpResponse: function(link2) {
      if (XMLHttpRequest != void 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", link2, false);
        xmlhttp.send();
        if (xmlhttp.status == 200)
          ExtensionLoader.load(xmlhttp.responseText);
      }
    }
  };

  // src/context/extensions/unimath.js
  var unimath = {
    title: "unimath",
    description: "mathematics unicode extension",
    fixed: {
      napprox: "\u2249",
      // original
      stareq: "\u225B",
      // original
      deltaeq: "\u225C",
      // original
      meq: "\u225E",
      // original
      defeq: "\u225D",
      // original
      qeq: "\u225F",
      // original
      questeq: "\u225F",
      // fcitx & ibus
      arceq: "\u2258",
      // fcitx & ibus
      wedgeq: "\u2259",
      // fcitx & ibus
      veeeq: "\u225A",
      // fcitx & ibus
      circeq: "\u2257",
      // fcitx & ibus
      increment: "\u2206",
      // original
      smallin: "\u220A",
      // original
      smallni: "\u220D",
      // original
      division: "\u2215",
      // original
      cint: "\u2231",
      // original
      ccint: "\u2232",
      // original
      accint: "\u2233",
      // original
      overa: "\u0363",
      // original
      overe: "\u0364",
      // original
      overi: "\u0365",
      // original
      overo: "\u0366",
      // original
      overu: "\u0367",
      // original
      overc: "\u0368",
      // original
      overd: "\u0369",
      // original
      overh: "\u036A",
      // original
      overm: "\u036B",
      // original
      overr: "\u036C",
      // original
      overt: "\u036E",
      // original
      overx: "\u036F"
      // original
    },
    unary: {}
  };

  // src/context/extensions/shorthand.js
  var autoFirstLetterUppercase = function(fixeds2) {
    Object.keys(fixeds2).forEach(function(name) {
      shorthand.fixed[name] = fixeds2[name];
      const [upperName, upperValue] = [name, fixeds2[name]].map((x) => x.charAt(0).toUpperCase() + x.substring(1));
      shorthand.fixed[upperName] = upperValue;
    });
  };
  var shorthand = {
    title: "shorthand",
    description: "shorthand tex",
    fixed: {}
  };
  autoFirstLetterUppercase({
    wlog: "without loss of generality",
    walog: "without any loss of generality",
    tfae: "the following are equivalent"
  });

  // src/context/extensions/hyper.js
  var hyper = {
    title: "hyper",
    description: "text processor extension",
    unary: {
      length: (s) => s.length,
      lower: (s) => s.toLowerCase(),
      upper: (s) => s.toUpperCase()
    },
    binary: {
      repeat: (s, n) => s.repeat(n),
      for: (s, n) => [...Array(parseInt(n)).keys()].map((x) => parse(s.replace(/#(\d+)/g, (__, n2) => x + +n2))).reduce((x, y) => x + y)
    }
  };

  // src/context/context.js
  var Context = {
    minimal: {
      title: "minimal",
      enableDefaultValueIdentity: true,
      extensions: [],
      language: "en-US",
      // `latex` or ``
      target: "latex"
    },
    standard: {
      title: "standard",
      enableDefaultValueIdentity: true,
      extensions: [unimath, shorthand, hyper],
      language: "en-US"
    }
  };
  var context_default = Context;
  var ensureContextNonNull = (x) => x || Context.standard;
  Context.use = function(context = Context.standard) {
    typeof context == "string" && (context = Context[context]);
    return context ? context.extensions.forEach((x) => ExtensionLoader.load(x)) : context;
  };
  unary_default.usecontext = (x) => (Context.use(x), "");
  Context.getContext = function() {
    return ensureContextNonNull(Context.current);
  };
  Context.use();

  // unitex.js
  var backslash = character("\\");
  var lbrace = character("{");
  var rbrace = character("}");
  var brace_wrap = (x) => lbrace.move(x).skip(rbrace);
  var lbracket = character("[");
  var rbracket = character("]");
  var bracket_wrap = (x) => lbracket.move(x).skip(rbracket);
  var special = (x) => "\\{}_^%$".includes(x);
  var literal = token((x) => !special(x));
  var literals = literal.plus();
  var solid = (x) => x.trim().length == 1;
  var valuesymbol = literal.check(solid);
  var single = digit.or(letter).or(valuesymbol).or(() => fixed_macro);
  var value = loose(single.or(brace_wrap(() => text)));
  var optional = bracket_wrap(value);
  var symbol_macros = includes(..."|,>:;!()[]{}_%\\`^~=.\"'");
  var macro_name = letters.or(symbol_macros);
  var macro_head = backslash.move(macro_name);
  var fixed_macro = macro_head.check((x) => fixed_default[x] != void 0).map((x) => fixed_default[x]);
  var unary_ordinary_macro = macro_head.check((x) => unary_default[x]).follow(value).map(([name, arg1]) => unary_default[name](arg1));
  var unary_optional_macro = macro_head.check((x) => UnaryOptional[x]).follows(optional, value).map(([[name, opt1], arg1]) => UnaryOptional[name](opt1, arg1));
  var unary_macro = unary_optional_macro.or(unary_ordinary_macro);
  var binary_macro = macro_head.check((x) => binary_default[x]).follows(value, value).map(([[name, arg1], arg2]) => binary_default[name](arg1, arg2));
  var infix_macro = value.follow(macro_head.check((x) => BinaryInfix[x])).follow(value).map((xs) => binary_default[xs[0][1]](xs[0][0], xs[1]));
  var braced_letters = brace_wrap(letters);
  var begin = backslash.skip(string("begin")).move(braced_letters);
  var end = backslash.skip(string("end")).move(braced_letters);
  var environ = begin.follow(() => section).follow(end).check((xs) => xs[0][0] == xs[1]).map((xs) => environment_default[xs[1]](xs[0][1]));
  var supscript = character("^").move(value).map(unicode_default.suprender);
  var subscript = character("_").move(value).map(unicode_default.subrender);
  var suporsub = supscript.or(subscript);
  var comment = character("%").skip(token((x) => x != "\n").asterisk()).skip(character("\n")).map(() => "");
  var typeface2 = macro_head.check((x) => unary_default.typefaceNames.includes(x)).follow(value).map((name, arg1) => unary_default[name](arg1));
  var inline_elem = literals.or(suporsub).or(environ).or(unary_macro).or(binary_macro).or(value);
  var italic_render = (s) => unicode_default.render_if_exists(s, "mathit");
  var inline_cluster = typeface2.or(inline_elem.map(italic_render)).plus();
  var dollar = character("$");
  var inline_math = dollar.move(inline_cluster).skip(dollar);
  var block_infix = token((x) => "+-*/<>~".includes(x)).or(macro_head.check((x) => fixed_default.infixs.includes(x)).map((x) => fixed_default[x])).map((x) => ` ${x} `.toBlock());
  var block_value = loose(single.map((x) => x.toBlock()).or(brace_wrap(() => block_cluster)));
  var block_binary_macro = macro_head.check((x) => BinaryBlock[x]).follows(block_value, block_value).map((xs) => BinaryBlock[xs[0][0]](xs[0][1], xs[1]));
  var block_elem = loose(block_infix).or(block_value).or(suporsub.map(block_default.of)).or(fixed_macro.map(block_default.of)).or(unary_macro.map(block_default.of)).or(block_binary_macro).or(token((x) => !solid(x)).some().map(() => block_default.empty));
  var block_cluster = block_elem.some().map((x) => x.reduce((s, t) => s.append(t)));
  var double_dollar = string("$$");
  var block_math = double_dollar.move(block_cluster.map((x) => x.string)).skip(double_dollar);
  var mathstyle = block_math.or(inline_math);
  var element = literals.or(comment).or(mathstyle).or(inline_elem);
  var double_backslash = string("\\\\");
  var section = double_backslash.or(element).plus();
  var unknown_macro = macro_head.map((x) => "\\" + x);
  var spectrum = element.or(unknown_macro);
  var text = spectrum.plus();
  var parse = (s) => ((x) => x ? x[0] : "")(text.parse(s));
  var fixeds = () => Object.keys(fixed_default);
  var unaries = () => Object.keys(unary_default);
  var binaries = () => Object.keys(binary_default);
  var getContext = () => context_default.getContext();
  return __toCommonJS(unitex_exports);
})();
