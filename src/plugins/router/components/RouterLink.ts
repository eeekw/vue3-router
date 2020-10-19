import { defineComponent, inject, h } from 'vue'
import { Router } from '../router'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const router = inject<Router>('router')!

    return () => h('a', {
      onClick: () => {
        router.push(props.to)
      }
    }, slots.default && slots.default())
  }
})