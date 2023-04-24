<template>
  <template v-if="isShowHeader">
    <div class="header-img">
      <img alt="Vue logo"
        src="./assets/logo.png">
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="router-link">
      <router-link to="/base-login">登录页</router-link>
      <router-link to="/hello-world"
        :class="{'selected': fullPath === '/hello-world'}">Hello World</router-link>
      <router-link to="/"
        :class="{'selected': fullPath === '/' || fullPath === '/home'}">Home</router-link>
      <router-link :to="{ path: '/use-element', query: { value: 'default' } }">
        element-plus
      </router-link>
      <el-button @click="openAxiosPage">axios</el-button>
    </div>
  </template>
  <router-view />
</template>

<script setup>
import { useRouter } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref, watch } from 'vue'
const isShowHeader = ref(true)
const fullPath = ref('')

const Router = useRouter()

watch(
  // 不能直接侦听响应式对象的属性值, 需要用一个返回该属性的 getter 函数
  () => Router.currentRoute.value,
  newValue => {
    console.log(newValue)
    newValue.meta.hideHeader ? isShowHeader.value = false : isShowHeader.value = true
    fullPath.value = newValue.fullPath
  },
  // immediate 立即执行回调，默认懒执行
  // deep 强制转成深层侦听器
  { immediate: true, deep: true }
)

// function toRouter() {
//   Router.push({
//     name: 'NotFound',
//     // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
//     params: { pathMatch: this.$route.path.substring(1).split('/') },
//     // 保留现有的查询和 hash 值，如果有的话
//     query: this.$route.query,
//     hash: this.$route.hash,
//   })
// }

function openAxiosPage() {
  console.log('openaxios')
  Router.push({
    name: 'axios',
    query: { name: 'axios' }
  })
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
<style scoped lang="scss">
.header-img {
  display: flex;
  justify-content: center;
}
.router-link {
  font-size: 14px;
  margin-bottom: 20px;
  a {
    margin-right: 15px;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .selected {
    background-color: gray;
    color: #fff;
    font-weight: 600;
  }
}
</style>
