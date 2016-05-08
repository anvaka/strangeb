import {setStateFromHash} from './appState.js'

export default monitorHash();

function monitorHash() {
  if (typeof window === 'undefined') return noop

  window.addEventListener('hashchange', setStateFromHash)

  return unsubscribe
}

function noop() { }

function unsubscribe() {
  window.removeEventListener('hashchange', setStateFromHash)
}
