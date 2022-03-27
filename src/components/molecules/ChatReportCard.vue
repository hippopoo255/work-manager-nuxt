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
    const { store, i18n } = useContext()
    const admin = computed(() => store.getters['admin/currentAdmin'])
    const { chat, fetchChartData } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: i18n.t('card.title.chat'),
      icon: 'mdi-chat-outline',
    })
    watch(
      () => admin.value,
      async (admin) => {
        if (!!admin && !!admin.jwt) {
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
