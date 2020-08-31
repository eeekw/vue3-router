import type { Component } from 'vue'

class Route {
  path: string

  component: Component

  parent?: Route | null

  constructor(path: string, component: Component, parent?: Route) {
    this.path = path
    this.component = component
    this.parent = parent
  }
}

export default Route
