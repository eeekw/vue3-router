export type Listener = (current: string, old: string) => void

export type HashHistory = {
  location: string
  listen: (on: Listener) => void
  push: (location: HistoryLocation) => void
}

export type HistoryLocation = string

export function createHashHistory(base?: string) {
  let b = base
  if (!b) {
    b = ''
  }
  if (b.indexOf('#') < 0) {
    b += '#'
  }

  const normalized = normalizeBase(b)

  const location = createLocation(normalized, window.location)

  let oldLocation = ''
  let currentLocation = location

  const hashChangeHandler = () => {
    const newLocation = createLocation(normalized, window.location)

    if (currentLocation === newLocation) {
      return
    }

    oldLocation = currentLocation
    currentLocation = newLocation

    listeners.forEach(cb => {
      cb(newLocation, oldLocation)
    })
  }

  const listeners: Listener[] = []

  const hashHistory : HashHistory = {

    get location(): string {
      return currentLocation
    },

    listen(on: Listener) {
      listeners.push(on)
      window.addEventListener('hashchange', hashChangeHandler)
    },

    push(l: HistoryLocation) {
      oldLocation = currentLocation
      currentLocation = l
      window.location.hash = l
    }
  }
  return hashHistory
}

function normalizeBase(base?:string): string {
  let b = base
  if (!b) {
    b = '/'
  }
  if (b[0] !== '/') {
    b = `/${b}`
  }
  return b
}

function createLocation(base: string, location: Location): HistoryLocation {
  const { pathname, search, hash } = location
  if (base.indexOf('#')) {
    let path = hash.slice(1)
    if (path[0] !== '/') {
      path = `/${path}`
    }
    return path
  }

  const path = (() => {
    if (!base || pathname.indexOf(base)) {
      return pathname
    }
    return pathname.slice(base.length)
  })()

  return path + search + hash
}
