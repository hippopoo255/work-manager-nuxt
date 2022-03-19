<template>
  <DashboardCard :title="title" resource="activity" scroll no-title-space>
    <Loader v-if="loading" slot="card-content" absolute />
    <ActivityRows v-else slot="card-content" :activities="activities" />
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
    const { activities, fetchActivityList } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: 'アクティビティ',
      icon: 'mdi-post-outline',
    })
    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await fetchActivityList().then(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      activities,
      title,
      loading,
    }
  },
})
</script>
<style lang="scss">
.date {
  font-size: $fontSizeXs;
  color: $darkGrey1;
}
</style>
