import { RawRoute } from './types'
import { Route, createRoute } from './route'

export default class RouteMatcher {
  routeMatchMap: Map<string, Route>

  routeMatchList: string[]

  constructor(routes?: RawRoute[]) {
    this.routeMatchMap = new Map()
    this.routeMatchList = []
    if (routes) {
      this.addRouteMacth(routes)
    }
  }

  addRouteMacth(routes: RawRoute[], parent?: Route) {
    if (parent) {
      const { path } = parent
      if (!this.routeMatchMap.get(path)) {
        this.routeMatchMap.set(path, parent)
        this.routeMatchList.push(path)
      }
    }
    if (routes.length === 0) {
      return
    }
    routes.forEach((o) => {
      const { component, children } = o
      let { path } = o
      if (parent) {
        const { path: rootPath } = parent
        path = rootPath + path
      }
      const route = createRoute(path, component, parent)
      this.addRouteMacth(children ?? [], route)
    })
  }

  matchRoute(path: string): Route | undefined | null {
    const routeMatch = this.routeMatchList.find((v) => {
      const reg = new RegExp(`^${v}$`)
      return reg.test(path)
    })
    if (!routeMatch) {
      return null
    }
    return this.routeMatchMap.get(routeMatch)
  }
}
