export type Listener = (current: string, old: string) => void

export type HistoryLocation = string

export abstract class History {
  protected listeners: Listener[]

  protected oldLocation: HistoryLocation

  protected currentLocation: HistoryLocation

  private normalized: string

  constructor(base?: string) {
    const normalized = normalizeBase(base)
    this.normalized = normalized
    const location = createLocation(normalized, window.location)

    this.oldLocation = ''
    this.currentLocation = location

    this.listeners = []
  }

  get location(): string {
    return this.currentLocation
  }

  protected historyChange() {
    const { normalized, oldLocation, currentLocation } = this
    const newLocation = createLocation(normalized, window.location)
    if (currentLocation === newLocation) {
      return
    }

    this.oldLocation = currentLocation
    this.currentLocation = newLocation

    this.listeners.forEach(cb => {
      cb(newLocation, oldLocation)
    })
  }

  listen(on: Listener) {
    this.listeners.push(on)
  }

  push(l: HistoryLocation) {
    this.oldLocation = this.currentLocation
    this.currentLocation = l
  }
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