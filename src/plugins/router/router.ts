import type { App, Component } from 'vue'
import RouteMatcher from './matcher'

const install = (app: App, options: RouterOption): void => {
  app.config.globalProperties.$router = new Router(options)
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

  constructor(options: RouterOption) {
    const { routes } = options
    this.matcher = new RouteMatcher(routes)
  }
}

Router.install = install
