import type {
  App, Plugin, Ref
} from 'vue'
import { shallowRef } from 'vue'

import { MatchedRouteLocation, RawRoute } from './types'
import { ROUTE_LOCATION_INIT } from './constant'
import RouteMatcher from './matcher'
import { HistoryLocation } from './history/history'
import { HashHistory } from './history/hash'
import { Html5History } from './history/html5'
import { Route } from './route'
import RouterView from './components/RouterView'

export type RouterConfig = {
  routes: RawRoute[]
  mode?: Mode
}

export enum Mode {
  Hash,
  History
}

export type Router = Plugin & {
  addRoutes: (routes: RawRoute[]) => void
}

export function createRouter({ routes, mode = Mode.Hash } : RouterConfig): Router {
  const matcher = new RouteMatcher(routes)
  const history = mode === Mode.Hash ? new HashHistory() : new Html5History()

  const currentRouteLocation: Ref<MatchedRouteLocation> = shallowRef(ROUTE_LOCATION_INIT)

  function matchRouteLocation(path: string) {
    const matchedRoute = matcher.matchRoute(path)

    const matched: Route[] = []
    let t = matchedRoute
    while (t) {
      matched.unshift(t)
      t = t.parent
    }

    const matchedLocation: MatchedRouteLocation = {
      path,
      matched
    }
    return matchedLocation
  }

  function next(to: HistoryLocation) {
    const routePath = getRoutePath(to)
    const matchedRouteLocation = matchRouteLocation(routePath)
    currentRouteLocation.value = matchedRouteLocation
    history.push(to)
  }

  const router: Router = {
    install(app: App) {
      app.component('RouterView', RouterView)
      app.provide('route', currentRouteLocation)
      app.config.globalProperties.$router = this

      next(history.location)
      history.listen((to) => {
        next(to)
      })
    },

    addRoutes(rs: RawRoute[]) {
      matcher.addRouteMacth(rs)
    }
  }

  return router
}

function getRoutePath(location: HistoryLocation) {
  const reg = /^(\/.*?)(\?|#)?$/
  const match = reg.exec(location)
  if (!match) {
    return '/'
  }
  return match[1]
}