import Router from './router'
import Route from './route'

type CompleteCallback = () => void

type RouteChanged = (route?: Route) => void

export default class HashHistory {
  _router: Router

  currentRoute?: Route

  routeCbs: RouteChanged[]

  constructor(router: Router) {
    this._router = router
    this.routeCbs = []
    normalizeHash()
  }

  addListener() {
    window.onhashchange = () => {
      if (!normalizeHash()) {
        return
      }
      this.transitionTo()
    }
  }

  transitionTo(onComplete?: CompleteCallback) {
    const route = this._router.match(getHash())
    if (route !== this.currentRoute) {
      this.routeCbs.forEach(cb => {
        cb(route)
      })
    }
    if (onComplete) {
      onComplete()
    }
  }

  listen(on: RouteChanged) {
    this.routeCbs.push(on)
  }
}

function getHash(): string {
  return window.location.hash.slice(1)
}

function normalizeHash(): boolean {
  let { hash } = window.location
  const { href } = window.location
  if (hash.startsWith('#')) {
    hash = hash.slice(1)
  }
  if (hash.startsWith('/')) {
    return true
  }
  hash = `/${hash}`
  const i = href.indexOf('#')
  const base = i > -1 ? href.slice(0, i) : href
  // 更新hash的同时，更新历史记录
  window.location.replace(`${base}#${hash}`)
  return false
}
