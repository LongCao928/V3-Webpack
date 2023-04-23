import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
// import { useUserStore } from './stores'
import { loadAllPlugins } from './plugin'
import './styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 加载plugin
loadAllPlugins(app)
// const pinia = createPinia()

app.use(router)
// 注册 pinia
app.use(store)
// 注册 pinia 后调用状态
// useUserStore()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
