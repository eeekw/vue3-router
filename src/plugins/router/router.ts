import { shallowRef, ref, triggerRef } from 'vue'
import type { App, Component, Ref } from 'vue'
import RouteMatcher from './matcher'
import HashHistory from './hash'
import Route from './route'
import RouterView from './components/RouterView.vue'

const install = (app: App, options: RouterOption): void => {
  const router = new Router(options)
  router.register(app)
}

export enum Mode {
  Hash,
  History
}

export interface RouterOption {
  routes?: RouteOption[]
  mode?: Mode
}

export interface RouteOption {
  path: string
  component?: Component
  children?: RouteOption[]
}

export default class Router {
  static install: any

  mode = Mode.Hash

  matcher: RouteMatcher

  routes?: RouteOption[]

  route?: Route

  app?: App

  private _history?: HashHistory

  private _route: Ref<Route | undefined>

  constructor(options: RouterOption) {
    const { mode, routes } = options
    if (mode) {
      this.mode = mode
    }
    this.routes = routes
    this.matcher = new RouteMatcher()
    if (this.mode === Mode.Hash) {
      this._history = new HashHistory(this)
    }
    this._route = shallowRef() // shallowRef: 仅跟踪.value的变化，不会使整个value都是响应式，防止vue警告
    // this._route = ref()
  }

  register(app: App) {
    this.app = app
    app.config.globalProperties.$router = this
    app.provide('route', this._route)
    app.component('router-view', RouterView)
    this.init()
  }

  init() {
    if (this.routes) {
      this.addRoutes(this.routes)
    }
    this._history?.listen((route) => {
      this.route = route
      this._route.value = this.route
      triggerRef(this._route)
    })
    this._history?.transitionTo(() => {
      this._history?.addListener()
    })
  }

  addRoutes(routes: RouteOption[]) {
    this.matcher.addRouteMacth(routes)
  }

  match(path: string): Route | undefined {
    let routeMatched = this.matcher?.matchRoute(path)
    while (routeMatched?.parent) {
      routeMatched.parent.child = routeMatched
      routeMatched = routeMatched.parent
    }
    return routeMatched
  }
}

Router.install = install
