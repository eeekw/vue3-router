import type { App, Component, Ref } from 'vue'
import { readonly, ref } from 'vue'
import RouteMatcher from './matcher'
import HashHistory from './hash'
import Route from './route'
import RouterView from './components/RouterView.vue'

const install = (app: App, options: RouterOption): void => {
  const router = new Router(options)
  app.config.globalProperties.$router = router
  app.component('router-view', RouterView)
  app.provide('route', readonly(router.routeRef))
}

enum Mode {
  Hash,
  History
}

export interface RouterOption {
  routes: RouteOption[]
  mode: Mode
}

export interface RouteOption {
  path: string
  component?: Component
  children?: RouteOption[]
}

export default class Router {
  static install: any

  mode = Mode.Hash

  matcher?: RouteMatcher

  history?: HashHistory

  routeRef: Ref<Route | undefined>

  constructor(options: RouterOption) {
    const { routes } = options
    this.matcher = new RouteMatcher(routes)
    this.routeRef = ref()
    if (this.mode === Mode.Hash) {
      this.history = new HashHistory(this)
    }
    this.history?.listen((route) => {
      this.routeRef.value = route
    })
    this.history?.transitionTo(() => {
      this.history?.addListener()
    })
  }

  match(path: string) : Route | undefined {
    return this.matcher?.matchRoute(path)
  }
}

Router.install = install
