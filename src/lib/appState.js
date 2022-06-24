import queryHelper from './queryHelper.js'

let ignoreNextHashChange = false
var state = createState()

let defaultState = {
  x0: '100 * Math.cos(from)',
  y0: '100 * Math.sin(from)',
  x1: '130 * Math.cos(from + alpha)',
  y1: '130 * Math.sin(from + alpha)',
  x2: '130 * Math.cos(to - alpha)',
  y2: '130 * Math.sin(to - alpha)',
  x3: '100 * Math.cos(to)',
  y3: '100 * Math.sin(to)'
}

let defaultKeys = ['x0', 'y0', 'x1', 'y1', 'x2', 'y2', 'x3', 'y3']

setStateFromHash()

export default state;

export {
  setStateFromHash as setStateFromHash,
  setHashFromState as setHashFromState
}

function createState() {
  return {
    animation: []
  }
}

function setStateFromHash() {
  if (ignoreNextHashChange) {
    ignoreNextHashChange = false
    return
  }

  if (typeof window !== 'undefined') {
    let hash = window.location.hash
    let parsed = queryHelper.parse(hash)
    state.animation.length = 0;

    defaultKeys.forEach(name => {
      state.animation.push({
        name,
        code: parsed.search[name] || defaultState[name]
      });
    })
  }
}

function setHashFromState() {
  let animation = state.animation;
  let bag = {}; //Object.create(null);

  animation.forEach(item => {
    bag[item.name] = item.code
  })

  let hash = '#/?' + queryHelper.search(bag)

  let currentHash = window.location.hash
  if (currentHash !== hash) {
    ignoreNextHashChange = true
    window.location.replace(hash)
  }
}
