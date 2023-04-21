
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue')
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router