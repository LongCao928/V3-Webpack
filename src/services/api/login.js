
import { request } from '@/utils/request'

export default {
  accountLogin(data) {
    return request({
      url: '/users/login',
      method: 'post',
      data
    })
  },
  userInfoRequest() {
    return request({
      url: 'users/info',
      method: 'post'
    })
  }
}