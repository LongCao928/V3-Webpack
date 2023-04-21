import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
// 注册 pinia
app.use(pinia)
// 注册 pinia 后调用状态
useUserStore()
app.mount('#app')
