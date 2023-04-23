import store from '@/store'
import { defineStore } from 'pinia'
// import { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router'

// interface IPermissionState {
//   routes: RouteRecordRaw[]
//   dynamicRoutes: RouteRecordRaw[]
// }

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

const filterAsyncRoutes = (routes, roles) => {
  const res = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      routes: [],
      dynamicRoutes: []
    }
  },
  actions: {
    setRoutes(roles) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      this.routes = constantRoutes.concat(accessedRoutes)
      this.dynamicRoutes = accessedRoutes
    }
  }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}