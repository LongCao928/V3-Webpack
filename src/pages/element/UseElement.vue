
<template>
  <section>
    <div>element-plus</div>
    <div>el-input: <el-input v-model="value"></el-input></div>
    <div>
      <span>el-select: </span> 
      <el-select v-model="selectValue">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// const props = defineProps(['inputValue'])
// console.log(props)
const router = useRouter()
const route = useRoute()
const value = ref(route.query.value)
const selectValue = ref(1)
const options = [
  {
    id: 1,
    label: 'vue',
    value: 1
  },
  {
    id: 2,
    label: 'vue router',
    value: 2
  },
  {
    id: 3,
    label: 'pinia',
    value: 3
  }
]

console.log(router.currentRoute.value)
console.log(route.query)
</script>

<style scoped lang="scss">
  section {
    background-color: #fff;
    padding: 10px 20px;
    margin: 0 auto;
    border-radius: 10px;
  }
  div {
    margin: 8px;
    overflow: hidden;
  }
  .el-input, .el-select {
    width: 120px;
  }
</style>

