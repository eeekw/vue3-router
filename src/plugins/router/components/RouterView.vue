<template>
  <component v-if="route" :is="route.component"></component>
</template>

<script lang="ts">
import {
  defineComponent, shallowRef, inject, provide
} from 'vue'

import type Route from '../route'

export default defineComponent({
  setup() {
    const route = shallowRef(inject<Route>('route'))
    provide('route', route.value?.child)
    return {
      route
    }
  }
})
</script>

<style>
</style>