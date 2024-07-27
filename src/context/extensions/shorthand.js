
const autoFirstLetterUppercase = function (fixeds) {
  Object.keys(fixeds).forEach(function (name) {
    shorthand.fixed[name] = fixeds[name]
    const [upperName, upperValue] = [name, fixeds[name]]
      .map(x => x.charAt(0).toUpperCase() + x.substring(1))
    shorthand.fixed[upperName] = upperValue
  })
}

export const shorthand = {

  title: 'shorthand',
  description: 'shorthand tex',

  fixed: {}

}

autoFirstLetterUppercase({
  wlog: 'without loss of generality',
  walog: 'without any loss of generality',
  tfae: 'the following are equivalent',
})
