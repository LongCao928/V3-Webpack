const { VUE_APP_STAGE } = process.env

const userToken = `user_token_${VUE_APP_STAGE}`
const sToken = `s_token_${VUE_APP_STAGE}`

function clear() {
  sessionStorage.removeItem(sToken)
  sessionStorage.removeItem(userToken)
}

// 获取token
function getUserToken() {
  return sessionStorage.getItem(userToken) || ''
}
function getSToken() {
  return sessionStorage.getItem(sToken) || ''
}
// 设置token
// eslint-disable-next-line camelcase
function set(s_token, user_token) {
  // eslint-disable-next-line camelcase
  if (!s_token || typeof s_token !== 'string' || !user_token || typeof user_token !== 'string') {
    throw new Error('Token 必须是 string')
  }
  sessionStorage.setItem(sToken, s_token)
  sessionStorage.setItem(userToken, user_token)
}

export default {
  getUserToken,
  getSToken,
  set,
  clear
}