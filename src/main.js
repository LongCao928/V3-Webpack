import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/stores'
// import { useUserStore } from './stores'

const app = createApp(App)
// const pinia = createPinia()

app.use(router)
// 注册 pinia
app.use(store)
// 注册 pinia 后调用状态
// useUserStore()
app.mount('#app')
