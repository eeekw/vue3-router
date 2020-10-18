import type { Component } from 'vue'
import { Route } from '../route'

export type RawRoute = {
  path: string
  component: Component
  children?: RawRoute[]
}

export type RouteLocation = {
  path: string
  // hash: string
  // query: string
}

export type MatchedRouteLocation = RouteLocation & {
  matched: Route[]
}