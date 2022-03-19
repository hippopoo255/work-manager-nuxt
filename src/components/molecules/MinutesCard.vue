<template>
  <DashboardCard :title="title" resource="minutes">
    <Loader v-if="loading" slot="card-content" absolute />
    <LineChart v-else slot="card-content" :chart-data="minutes" />
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
    const { minutes, fetchChartData } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: '議事録',
      icon: 'mdi-post-outline',
    })
    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await fetchChartData('minutes').then(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      minutes,
      title,
      loading,
    }
  },
})
</script>
