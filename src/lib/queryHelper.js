let empty = {
  path: '',
  search: {}
}
let queryHelper = {
  parse,
  search
}

export default queryHelper;

function parse(qs) {
  if (!qs) return empty

  let parts = qs.match(/^#\/([^?]*)\?(.*)$/)
  if (!parts) return empty

  let search = Object.create(null)
  if (parts[2]) {
    parts[2].split('&').forEach(keyValuePair => {
      let part = keyValuePair.split('=')
      let key = window.decodeURIComponent(part[0])
      let value = window.decodeURIComponent(part[1])
      search[key] = value
    })
  }

  let path = parts[1]
  return {
    path, search
  }
}

function search(obj) {
  return Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&')
}
