<template>
  <div>首页</div>
  <div>pinia年龄：{{ age }}</div>
  <div>pinia理想年龄：{{ hopeAge }}</div>
</template>

<script setup>
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
const store = useUserStore()

const { age, hopeAge } = storeToRefs(store)
// const { incrementAge } = store
// incrementAge()

</script>

<style scoped lang="scss">
div {
  color: red;
}
</style>
