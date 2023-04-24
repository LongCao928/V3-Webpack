
import axios from 'axios'
import qs from 'qs'
import { ElMessage } from "element-plus"
import Token from '@/services/token'
import { httpCode } from '@/config'
import { Toast } from '@/utils/toast'
import { getToken } from '@/utils/cookies'

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 API 返回的数据
      const apiData = response.data
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code
      // 如果没有 Code, 代表这不是项目后端开发的 API
      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      } else {
        switch (code) {
          case 0:
            // code === 0 代表没有错误
            return apiData
          default:
            // 不是正确的 Code
            ElMessage.error(apiData.message || "Error")
            return Promise.reject(new Error("Error"))
        }
      }
    },
    (error) => {
      // Status 是 HTTP 状态码
      const status = error.response.status
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          // useUserStoreHook().logout()
          location.reload()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction(service) {
  return function (config) {
    const configDefault = {
      headers: {
        // 携带 Token
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json;charset=utf-8"
      },
      timeout: 5000,
      baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASEURL,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)


const baseURL = process.env.VUE_APP_BASEURL
const env = process.env.NODE_ENV

console.log(`${env}:${baseURL}`)

const instance = axios.create({
  withCredentials: true,
  timeout: 15 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    channel: 2
  }
})

// 请求拦截
instance.interceptors.request.use(config => {
  if (!config.noAccessToken) {
    console.log('noAccessToken')
    config.headers.token = Token.getUserToken()
    config.refreshToken = Token.getSToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截

instance.interceptors.response.use(response => {
  const { data } = response
  /*const key = data.code.slice(5)
  if (key !== errorCode.SUCCESS) {
    if (key === errorCode.EXPIRE) {
    sessionStorage.removeItem('userInfo')
    sessionStorage.removeItem('userDetails')
    Alert('登录状态过期，请重新登录 !', { showClose: false }).then(() => {
      window.location.href = baseRouter.LOGIN
    })
    } else {
    Toast(`${data.code}：${data.message}`, { type: 'error' })
    }
    return Promise.reject(new Error(data.message || '请求出错了'))
  }*/
  return data
}, error => {
  const { response } = error
  const resData = response?.data
  let errorMsg = `${response?.status || error.message}：请求出错啦 ~`
  const httpMessage = httpCode.find(item => item.code === response?.status)
  if (httpMessage) {
    errorMsg = httpMessage.message
    console.error(httpMessage.message)
  }
  if (resData?.message && resData?.code) {
    Toast(`${resData.code}：${resData.message}`, { type: 'error', duration: 3000 })
  } else {
    Toast(errorMsg, { type: 'error', duration: 3000 })
  }
  return Promise.reject(response)
})

function makeUrl(type, module, path, data) {
  const query = { ...(data || {}) }
  if (path[0] !== '/') path = `/${path}`
  let url = ''
  env === 'development' ? (url = '/api') : (url = baseURL)
  if (type === 'get') {
    url += `${module}${path}?${qs.stringify(query)}`
  } else {
    url += `${module}${path}`
  }
  return url
}


export default {
  async get(
    module,
    path,
    data,
    config
  ) {
    const url = makeUrl('get', module, path, data)
    return instance.get(url, config)
  },
  async post(
    module,
    path,
    data,
    config
  ) {
    const url = makeUrl('post', module, path, data)
    return instance.post(url, data ?? {}, config)
  }
}