
import { createRouter, createWebHistory } from 'vue-router'
import Loading from '@/utils/loading'
// import Token from '@/services/token'

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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/base/NotFound.vue'),
    meta: {
      title: '404',
      hideHeader: true
    }
  },
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
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/base/LoginPage.vue'),
    meta: {
      title: '登录',
      hideHeader: true
    }
  },
  {
    path: '/base-login',
    name: 'baseLogin',
    component: () => import('@/pages/base/login/index.vue'),
    meta: {
      title: 'base登录',
      hideHeader: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(
    to,
    _,
    savedPosition
  ) {
    if ((to.meta.savedPosition) && savedPosition) {
      return savedPosition
    }
    return {
      top: 0,
      left: 0
    }
  }
})

router.beforeEach((to, form, next) => {
  Loading.show()
  if (to.meta) {
    document.title = to.meta.title ? `${to.meta.title}` : 'V3 Webpack'
  }
  /* const token = Token.getUserToken()
  if (!token && to.name !== 'baseLogin') {
    next({ name: 'baseLogin' })
  } else {
    next()
  } */
  next()
})

router.afterEach(() => {
  Loading.hide()
})

export default router