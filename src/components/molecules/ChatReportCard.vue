<template>
  <DashboardCard :title="title" resource="chat">
    <Loader v-if="loading" slot="card-content" absolute />
    <LineChart v-else slot="card-content" :chart-data="chat" />
  </DashboardCard>
</template>

<script lang="ts">
import {
  computed,
  ref,
  defineComponent,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { useChartData } from '@/hooks'

export default defineComponent({
  setup() {
    const { store } = useContext()
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const { chat, fetchChartData } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: 'チャット',
      icon: 'mdi-chat-outline',
    })
    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await fetchChartData('chat').then(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      chat,
      title,
      loading,
    }
  },
})
</script>
