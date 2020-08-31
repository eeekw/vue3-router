import type { App, Component } from 'vue'
import Route from './route'
import RouteMatcher from './matcher'

const install = (app: App, options: RouterOption): void => {
  app.mixin({
    beforeCreate() {
      const router = new Router(options)
    }
  })
}

enum Mode {}

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

  matcher?: RouteMatcher

  constructor(options: RouterOption) {
    const { routes } = options
    this.matcher = new RouteMatcher(routes)
  }
}

Router.install = install
