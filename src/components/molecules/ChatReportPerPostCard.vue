<template>
  <DashboardCard :title="title" resource="chat">
    <Loader v-if="loading" slot="card-content" absolute />
    <HorizontalBarChart v-else slot="card-content" :chart-data="chatPerPost" />
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
    const { chatPerPost, fetchChartData } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: '投稿別累計',
      icon: 'mdi-chat-outline',
    })

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await fetchChartData('chatPerPost').then(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      chatPerPost,
      title,
      loading,
    }
  },
})
</script>
