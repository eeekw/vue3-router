import Route from './route'
import { RouteOption } from './router'

export default class RouteMatcher {
  routeMatch?: Map<string, Route>

  constructor(routes?: RouteOption[]) {
    this.routeMatch = new Map()
  }

  // eslint-disable-next-line class-methods-use-this
  matchRoute() {}

  protected addRouteMacth(routes?: RouteOption[], parent?: Route | null) {
    if (parent) {
      const { path } = parent
      if (!this.routeMatch?.get(path)) {
        this.routeMatch?.set(path, parent)
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
