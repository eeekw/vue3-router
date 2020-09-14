<template>
  <component v-if="route" :is="route.component"></component>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type Route from '../route'

export default defineComponent({
  setup() {
    const route = inject<Route>('route')
    return {
      route
    }
  }
})
</script>

<style>
</style>