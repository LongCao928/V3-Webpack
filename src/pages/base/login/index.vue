<template>
  <div class="login-container">
    <div class="logo-left">
      <!-- <img src="../../../themes/login/logo.png" alt="logo" /> -->
    </div>
    <div class="login-wrap">
      <!-- <div class="login-banner">
          <el-carousel height="320px" arrow="never">
          <el-carousel-item key="1">
            <img src="./banner1.png" alt="" />
          </el-carousel-item>
          <el-carousel-item key="2">
            <img src="./banner2.png" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div> -->
      <div class="login-tabs">
        <div class="login-form">
          <el-row class="title">
            <el-col>Hello, 欢迎回来</el-col>
          </el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick" class="mgt32">
            <el-tab-pane label="扫码登录" name="qrCode">
              <el-row>
                <el-col>
                  <div class="wx-login">
                    <!-- <div class="wx-img"></div> -->
                    <div class="wx-text">
                      <span>二维码</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <!-- 密码登录开始 -->
            <el-tab-pane class="mgt17" label="密码登录" name="password" v-if="!isProd">
              <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules">
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="phone">
                      <el-input
                        placeholder="手机号"
                        class="login-phone"
                        autocomplete="off"
                        clearable
                        :prefix-icon="Iphone"
                        v-model="passwordForm.phone"
                        :maxlength="11"
                        @keyup.enter="handlePswLoginIn"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="mgt28">
                  <el-col :span="24">
                    <el-form-item prop="password">
                      <el-input
                        placeholder="密码"
                        type="password"
                        show-password
                        clearable
                        class="login-pwd"
                        autocomplete="off"
                        :prefix-icon="Lock"
                        v-model="passwordForm.password"
                        @keyup.enter="handlePswLoginIn"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="btn-login-in mgt28">
                  <el-button
                    type="primary"
                    :loading="isPswLoginLoading"
                    @click.prevent="handlePswLoginIn"
                  >
                    {{ isPswLoginSuccess ? '跳转中，请稍候...' : '登 录' }}
                  </el-button>
                </el-row>
              </el-form>
            </el-tab-pane>
            <!-- 密码登录结束 -->
            <el-tab-pane label="验证码登录" name="code" class="mgt17" v-if="false">
              <el-form ref="ruleFormRef" :model="formLoginData" :rules="formLoginRules">
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="phone">
                      <el-input
                        placeholder="手机号"
                        class="login-phone"
                        autocomplete="off"
                        :prefix-icon="Iphone"
                        v-model="formLoginData.phone"
                        :maxlength="11"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="mgt28">
                  <el-col :span="17">
                    <el-form-item prop="code">
                      <el-input
                        placeholder="验证码"
                        class="login-code"
                        :prefix-icon="Message"
                        autocomplete="off"
                        v-model="formLoginData.code"
                        :maxlength="6"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" class="text-right">
                    <el-button
                      class="get-code"
                      type="primary"
                      :disabled="codeTimeout > 0"
                      :loading="codeLoading"
                      @click="handGetCode"
                    >
                      {{ codeText }}
                    </el-button>
                  </el-col>
                </el-row>
                <el-row class="btn-login-in mgt28">
                  <el-button
                    type="primary"
                    :loading="isLoginLoading"
                    @click.prevent="handleLoginIn"
                  >
                    {{ isLoginSuccess ? '跳转中，请稍候...' : '登 录' }}
                  </el-button>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
// import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
// import JSEncrypt from 'jsencrypt'
import { Iphone, Message, Lock } from '@element-plus/icons-vue'
// import { isProd, isDev, isTest } from '@/utils/env'
import Token from '@/services/token'
// import myMd5 from '@/utils/md5/index'
import userHttp from '@/services/api/index'
import * as Toast from '@/utils/toast'

// const State = useStore()
// process.env.NODE_ENV === 'production' && process.env.VUE_APP_STAGE = 'RELEASE'
const isProd = ref(false)

const Route = useRoute()

// 开始
const Router = useRouter()

const activeName = computed(() => {
  return 'password'
  // return 'qrCode'
})

const ruleFormRef = ref()

const formLoginData = reactive({
  phone: '',
  code: ''
})

const validatePass = (_rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (value && !/^1\d{10}$/.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

const formLoginRules = reactive({
  // { required: true, message: '请输入手机号', trigger: 'blur' },
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const codeLoading = ref(false)
// const codeText = ref('获取验证码')
const codeTimeout = ref(0)

const isLoginLoading = ref(false)
const isLoginSuccess = ref(false)

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const isPswLoginLoading = ref(false)
const isPswLoginSuccess = ref(false)
const passwordFormRef = ref()

const passwordForm = reactive({
  phone: '',
  password: ''
})

const passwordRules = reactive({
  phone: [
    // { required: true, message: '请输入手机号', trigger: 'blur' }
    { validator: validatePass, trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const handlePswLoginIn = () => {
  // Toast.Toast('测试', { type: 'success' })
  console.log('密码登录')
  passwordFormRef.value.validate(async (valid) => {
    console.log(valid)
    if (valid) {
      console.log('可正常登录')
      isPswLoginLoading.value = true
      const params = {
        mobile_num: passwordForm.phone,
        pwd: passwordForm.password
      }
      try {
        const res = await userHttp.pwdLogin(params)
        const { token, exp } = res.data
        console.log(token, exp)
        // 存储用户信息
        Token.set(token, exp)
        Router.push({ name: 'store-manage' })
      } catch (e) {
        console.log(e)
        isPswLoginLoading.value = false
      }
    }
  })
}

/*
 * 倒计时
 */
const setCodeInterval = () => {
  const codeInterval = setInterval(() => {
    if (codeTimeout.value > 0) {
      codeTimeout.value -= 1
    } else {
      clearInterval(codeInterval)
      codeTimeout.value = 0
      localStorage.removeItem('getCodeTime')
    }
  }, 1000)
}

const nonTraceSuccess = () => {
  Toast.Toast('验证码已发送，请注意查收，5分钟内有效')
  const getCodeTime = new Date().getTime()
  codeTimeout.value = 60
  setCodeInterval()
  localStorage.setItem('getCodeTime', String(getCodeTime))
  codeLoading.value = false
}

/*
 * 发送验证码
 */
const handGetCode = async () => {
  if (codeTimeout.value > 0) return
  ruleFormRef.value.validateField('phone', async (valid) => {
    if (valid) {
      codeLoading.value = true
      try {
        const resp = await userHttp.getVCde({ mobile_num: formLoginData.phone })
        console.log(resp) // {"code":0,"msg":"","data":[]}
        nonTraceSuccess()
      } catch (error) {
        console.log(error)
        codeLoading.value = false
      }
    }
  })
}

const codeText = computed(() => {
  if (codeTimeout.value > 0) {
    return `${codeTimeout.value}秒后重发`
  }
  if (codeLoading.value) {
    return '发送中'
  }
  return '获取验证码'
})

/*
 * 登录
 */

const handleLoginIn = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        isLoginLoading.value = true
        // setTimeout(() => {
        //   Router.push({ name: 'store-manage' })
        // }, 2000)
        // let resp = await UserService.loginByCode({
        //   code: code,
        //   mobile: mobile
        // })
        // this.afterLogin(resp.data, 'login_code')
        /* const paramLogin = {
          userName: formLoginData.phone,
          password: formLoginData.code
        }
        const resp = await userHttp.loginSaas(paramLogin)
        console.log(resp)
        console.log(Router) */
      } catch (e) {
        console.error(e)
        isLoginLoading.value = false
      }
    }
  })
}

// 结束

// const forms = ref()
// eslint-disable-next-line
/* const publicKeyA = ref(
  // eslint-disable-next-line
  `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8FP/ZK+6MVyRGLV+0vu/ACVqrv9D7CL6Xk6FLpaG
  YOnsipa1S2x8FN2o+P1ZN9/WvmXLAajPItXq0lYFoLQpOn1RVf4c+wezolaPmIpny5rruAGs26Y5FD
  7XuZd/0qQrZ111zC2vWqH4sXtGIgPxZ/I/HS8edaA8JvARIAyXTFQIDAQAB`
)
// 生产的公钥
const publicKeyB = ref(
  `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDyTGC9cZ9drL9LWZFD9z836IdlMEGhBsgjVCMEb
  +gH2ix07yBRA9zU2qdGvem0kQuIqJx61PKYbYQVmzAGURMDK6JbYAr6lzMbmnUx2MgvK1QTcgtSJSa73bJDv
  +fYMH+R5xB4soTADLA7sd29Fi2Op+XwpCudFaaVjHdyC6PL1wIDAQAB`
) */
/* const data = reactive({
  formData: {
    userName: '',
    password: ''
  },
  rules: {
    userName: {
      required: true,
      message: '请输入用户手机号',
      trigger: 'blur'
    },
    password: {
      required: true,
      message: '请输入用户密码',
      trigger: 'blur'
    }
  },
  submitLoading: false
}) */
// rsa加密
/* const encryptionDispose = (pwd: string) => {
  let publicKey = ''
  if (process.env.VUE_APP_STAGE === 'RELEASE') {
    publicKey = publicKeyB.value
  } else {
    publicKey = publicKeyA.value
  }
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  const rsaPwd = encryptor.encrypt(pwd)
  return rsaPwd || ''
} */
// md5加密
/* const md5Dispose: (value: string) => string = salt => {
  // 第一层md5加密密码
  const one = myMd5(data.formData.password)
  // 第二层md5加密(密码 + salt)
  const two = myMd5(one + salt)
  // 第三层rsa公钥加密
  const pwd = encryptionDispose(two)
  if (!pwd) throw new Error('加密失败')
  return pwd
} */
// 登录
/* const login = async () => {
  try {
    data.submitLoading = true
    const config = await userHttp.syncServiceConfig({ userName: data.formData.userName })
    const pwd = md5Dispose(config.data.md5Salt)
    const param = {
      userName: data.formData.userName,
      password: pwd
    }
    const loginRes = await userHttp.login(param)
    // 存储用户信息
    Token.set(loginRes.data.sToken, loginRes.data.userToken)
    State.commit('userInfo/setUserInfo', loginRes.data)
    sessionStorage.setItem('userInfo', JSON.stringify(loginRes.data))
    // 获取用户详情
    const Req = {
      userId: loginRes.data.userId,
      userType: loginRes.data.userType
    }
    const userDetailsRes = await userHttp.getDetails(Req)
    // 存储用户详情
    State.commit('userInfo/setUserDetails', userDetailsRes.data)
    sessionStorage.setItem('userDetails', JSON.stringify(userDetailsRes.data))
    data.submitLoading = false
    if (loginRes.data.isNeedUpdatePassword === 1) {
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('userDetails')
      Toast.alert('首次登录需要修改密码 !', '提示', { showClose: false }).then(() => {
        Router.push({
          name: 'SignIn',
          query: {
            n: data.formData.userName
          }
        })
      })
    } else {
      Toast.success('登录成功 !')
      Router.push({ name: 'InstallManage' })
    }
  } catch (error) {
    data.submitLoading = false
    console.warn(error)
  }
} */
// 校验
// const handleValidate = () => {
//   forms.value.validate((valid: boolean) => {
//     if (valid) login()
//   })
// }
// 挂载
onMounted(() => {
  // 回车登录
  document.onkeydown = (e) => {
    const Path = Route.name
    const Key = e.key
    if (Path === 'Login' && Key === 'Enter') {
      // if (isLoginLoading.value) return
      // handlePswLoginIn()
    }
  }
  const time = Number(localStorage.getItem('getCodeTime'))
  if (time && time > 0) {
    codeTimeout.value = Math.round(60 - (new Date().getTime() - time) / 1000)
    setCodeInterval()
  }
})
</script>
<style lang="scss" scoped src="./style.scss"></style>

<!-- <style scoped lang="scss">

#login_box{
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('@/assets/login_bg.png');
  background-size: 100% 100%;
}

</style> -->