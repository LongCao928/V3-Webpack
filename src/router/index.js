
import { createRouter, createWebHistory } from 'vue-router'
import Loading from '@/utils/loading'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue'),
    alias: '/home'
  },
  {
    path: '/home',
    redirect: '/',
    // redirect: { name: 'home' }
  },
  {
    path: '/hello-world',
    name: 'helloWorld',
    component: () => import('@/components/HelloWorld.vue')
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/base/NotFound.vue') },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  // { path: '/user-:afterUser(.*)', component: UserGeneric },
  {
    path: '/use-element',
    name: 'useElement',
    component: () => import('@/pages/element/UseElement.vue'),
    meta: {
      title: 'element-plus',
      hideHeader: true
    },
  },
  {
    path: '/axios',
    name: 'axios',
    component: () => import('@/pages/axios/UseAxios.vue'),
    meta: {
      title: 'axios',
      hideHeader: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, form, next) => {
  Loading.show()
  if (to.meta) {
    document.title = to.meta.title ? `${to.meta.title}` : 'V3 Webpack'
  }
  next()
})

router.afterEach(() => {
  Loading.hide()
})

export default router