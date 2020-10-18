import {
  defineComponent, inject, provide, computed, h
} from 'vue'
import type { Ref } from 'vue'

import { MatchedRouteLocation } from '../types'

export default defineComponent({
  setup() {
    const matchedLocation = inject<Ref<MatchedRouteLocation>>('route')!
    const depth = inject('depth', 0)

    const routeRef = computed(() => matchedLocation.value.matched[depth])

    provide('depth', depth + 1)

    return () => {
      const route = routeRef.value
      const component = route && route.component
      if (!component) {
        return null
      }
      return h(component)
    }
  }
})