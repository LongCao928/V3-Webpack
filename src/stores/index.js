
import { createPinia, defineStore } from 'pinia'
import { ref, computed } from 'vue'

const store = createPinia()

export const useUserStore = defineStore('user', () => {
  const age = ref(26)
  const hopeAge = computed(() => { return age.value - 8 })

  function incrementAge() {
    age.value++
  }
  return { age, hopeAge, incrementAge }
})

export default store