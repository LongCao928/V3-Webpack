import Request from '@/utils/request'
import Module from '@/services/module'
export default {
  // 开始
  pwdLogin(param) {
    return Request.post(
      Module.Employee,
      '/authn/login',
      { ...param },
      { noAccessToken: true }
    )
  },
  /*
   * 获取验证码
   * @param {Object} mobile_num 手机号
   */
  getVCde(param) {
    return Request.post(
      Module.Employee,
      '/send-sms-code',
      { ...param },
      { noAccessToken: true }
    )
  },
}