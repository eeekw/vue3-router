import type { Component } from 'vue'

export type Route = {
  path: string

  component: Component

  parent?: Route
}

export function createRoute(path: string, component: Component, parent?: Route) : Route {
  const route: Route = {
    path,
    component,
    parent
  }

  return route
}