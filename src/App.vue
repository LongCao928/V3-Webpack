<template>
  <template v-if="isShowHeader">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </template>
  <div class="router-link">
    <router-link to="/hello-world">Hello World!</router-link>
    <router-link to="/">Home!</router-link>
  </div>
  <router-view />
</template>

<script setup>
// import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
const isShowHeader = ref(true)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
<style scoped lang="scss">
.router-link {
  font-size: 12px;
  margin-bottom: 20px;
  a {
    margin-right: 15px;
  }
}
</style>
