import store from '@/stores'
import { defineStore } from 'pinia'
// import { usePermissionStore } from './permission'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { accountLogin, userInfoRequest } from '@/services/api/login'
// import { RouteRecordRaw } from 'vue-router'

// interface IUserState {
//   token: string
//   roles: string[]
// }

export const useUserInfoStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: getToken() || '',
      roles: []
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles) {
      this.roles = roles
    },
    /** 登录 */
    login(userInfo) {
      return new Promise((resolve, reject) => {
        accountLogin({
          username: userInfo.username.trim(),
          password: userInfo.password
        })
          .then((res) => {
            setToken(res.data.accessToken)
            this.token = res.data.accessToken
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 获取用户详情 */
    getInfo() {
      return new Promise((resolve, reject) => {
        userInfoRequest()
          .then((res) => {
            this.roles = res.data.user.roles
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 切换角色 */
    // async changeRoles(role) {
    //   const token = role + '-token'
    //   this.token = token
    //   setToken(token)
    //   await this.getInfo()
    //   const permissionStore = usePermissionStore()
    //   permissionStore.setRoutes(this.roles)
    //   resetRouter()
    //   permissionStore.dynamicRoutes.forEach((item) => {
    //     router.addRoute(item)
    //   })
    // },
    /** 登出 */
    logout() {
      removeToken()
      this.token = ''
      this.roles = []
      resetRouter()
    },
    /** 重置 token */
    resetToken() {
      removeToken()
      this.token = ''
      this.roles = []
    }
  }
})

/** 在 setup 外使用 */
export function useUserInfoStoreHook() {
  return useUserInfoStore(store)
}