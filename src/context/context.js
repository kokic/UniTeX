
// language
// macro-mode

import { ExtensionLoader } from "./extension.js"
import { unimath } from "./extensions/unimath.js"
import { shorthand } from "./extensions/shorthand.js"
import { hyper } from "./extensions/hyper.js"
import Unary from "../macro/unary.js"

const Context = {

  minimal: {
    title: 'minimal', 
    enableDefaultValueIdentity: true,
    extensions: [],
    language: 'en-US',
    // `latex` or ``
    target: 'latex' 
  },

  standard: {
    title: 'standard', 
    enableDefaultValueIdentity: true,
    extensions: [unimath, shorthand, hyper],
    language: 'en-US',
  }, 



}

export default Context

const ensureContextNonNull = x => x || Context.standard

/* W.I.P. */
Context.use = function (context = Context.standard) {
  typeof context == 'string' && (context = Context[context])
  return context /* context != undefined */
    ? context.extensions.forEach(x => ExtensionLoader.load(x))
    : context
}

Unary.usecontext = x => (Context.use(x), '')

Context.getContext = function () {
  return ensureContextNonNull(Context.current)
}

Context.use()
