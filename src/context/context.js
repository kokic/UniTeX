
// language
// macro-mode

import { ExtensionLoader, unimath } from "./extension.js"

const Context = {

  minimal: {
    enableDefaultValueIdentity: true,
    extensions: [],
    language: 'en-US',
  },

  standard: {
    enableDefaultValueIdentity: true,
    extensions: [unimath],
    language: 'en-US',
  }

}

export default Context

const ensureContextNonNull = x => x || Context.standard

Context.use = function (context = Context.standard) {
  typeof context == 'string' && (context = Context[context])
  return context /* context != undefined */
    ? context.extensions.forEach(x => ExtensionLoader.load(x))
    : context
}

Context.getContext = function () {
  return ensureContextNonNull(Context.current)
}

Context.use()
