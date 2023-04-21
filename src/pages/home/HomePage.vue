<template>
  <div>首页</div>
  <div>pinia年龄：{{ age }}</div>
  <div>pinia理想年龄：{{ hopeAge }}</div>
  <div>{{ '' }}</div>
</template>

<script setup>
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
const store = useUserStore()

const { age, hopeAge } = storeToRefs(store)
// const { incrementAge } = store
// incrementAge()
console.log(_.join([1,2,3,4,5], '~'))
</script>

<style scoped lang="scss">
div {
  color: red;
}
</style>
