<template>
  <div>
    <h2>ダッシュボード</h2>
    <div>
      <p>{{ admin.full_name }}さん、こんにちは</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { store } = useContext()
    const admin = computed(() => store.getters['admin/currentAdmin'])
    return {
      admin,
    }
  },
})
</script>
