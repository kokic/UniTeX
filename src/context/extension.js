

import Fixed from "../macro/fixed.js";
import Unary from "../macro/unary.js";
import Binary from "../macro/binary.js";

// more mathematics unicode as tex source code style

export const unimath = {

  title: 'unimath',
  description: 'mathematics unicode extension',

  fixed: {

    napprox: '≉', // original
    stareq: '≛', // original
    deltaeq: '≜', // original

    meq: '≞', // original
    defeq: '≝', // original
    qeq: '≟', // original

    questeq: '≟', // fcitx & ibus
    arceq: '≘', // fcitx & ibus
    wedgeq: '≙', // fcitx & ibus
    veeeq: '≚', // fcitx & ibus
    circeq: '≗', // fcitx & ibus

    increment: '∆', // original

    smallin: '∊', // original
    smallni: '∍', // original

    division: '∕', // original

    cint: '∱', // original
    ccint: '∲', // original
    accint: '∳', // original

    overa: '\u0363', // original
    overe: '\u0364', // original
    overi: '\u0365', // original
    overo: '\u0366', // original
    overu: '\u0367', // original

    overc: '\u0368', // original
    overd: '\u0369', // original
    overh: '\u036A', // original
    overm: '\u036B', // original
    overr: '\u036C', // original
    overt: '\u036E', // original
    overx: '\u036F', // original

  }, 

  binary: {
    repeat: (s, n) => s.repeat(n)
  }

}

export const ExtensionLoader = {

  load: function (extension) {
    const { fixed, unary, binary } = extension
    fixed && Object.keys(fixed).forEach(x => Fixed[x] = fixed[x])
    unary && Object.keys(unary).forEach(x => Unary[x] = unary[x])
    binary && Object.keys(binary).forEach(x => Binary[x] = binary[x])
  }

}


