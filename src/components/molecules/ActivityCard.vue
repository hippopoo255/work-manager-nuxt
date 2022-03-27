<template>
  <DashboardCard :title="title" resource="activity" scroll no-title-space>
    <Loader v-if="loading" slot="card-content" absolute />
    <p v-else-if="!activities.length" slot="card-content">データがありません</p>
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
    const { store, i18n } = useContext()
    const admin = computed(() => store.getters['admin/currentAdmin'])
    const { activities, fetchActivityList } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: i18n.t('card.title.activity'),
      icon: 'mdi-post-outline',
    })
    watch(
      () => admin.value,
      async (admin) => {
        if (!!admin && !!admin.jwt) {
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
