import { createApp } from 'vue'
import App from '@/App.vue'
import Router from './plugins/router'
import router from './router'

const app = createApp(App)

app.use(Router, { router })
app.mount('#app')
