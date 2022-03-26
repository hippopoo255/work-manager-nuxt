<template>
  <DashboardCard :title="title" resource="chat">
    <Loader v-if="loading" slot="card-content" absolute />
    <HorizontalBarChart v-else slot="card-content" :chart-data="chatPerUser" />
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
    const admin = computed(() => store.getters['admin/currentAdmin'])
    const { chatPerUser, fetchChartData } = useChartData()

    const loading = ref(true)
    const title = ref({
      text: 'ユーザー別累計',
      icon: 'mdi-account-multiple-outline',
    })

    watch(
      () => admin.value,
      async (admin) => {
        if (!!admin && !!admin.jwt) {
          await fetchChartData('chatPerUser').then(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      chatPerUser,
      title,
      loading,
    }
  },
})
</script>
