import Route from './route'
import { RouteOption } from './router'

export default class RouteMatcher {
  routeMatchMap: Map<string, Route>

  routeMatchList: string[]

  constructor(routes?: RouteOption[]) {
    this.routeMatchMap = new Map()
    this.routeMatchList = []
    this.addRouteMacth(routes)
  }

  matchRoute(path: string): Route | undefined {
    const routeMatch = this.routeMatchList.find((v) => {
      const reg = new RegExp(v)
      return reg.test(path)
    })
    if (!routeMatch) {
      return undefined
    }
    return this.routeMatchMap.get(routeMatch)
  }

  protected addRouteMacth(routes?: RouteOption[], parent?: Route | null) {
    if (parent) {
      const { path } = parent
      if (!this.routeMatchMap.get(path)) {
        this.routeMatchMap.set(path, parent)
        this.routeMatchList.push(path)
      }
    }
    if (!routes || routes.length === 0) {
      return
    }
    routes.forEach((o) => {
      const { component, children } = o
      let { path } = o
      if (parent) {
        const { path: rootPath } = parent
        path = rootPath + path
      }
      const route = new Route(path, component!)
      this.addRouteMacth(children, route)
    })
  }
}
