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
  PropType,
} from '@nuxtjs/composition-api'
import { useChartData } from '@/hooks'

export default defineComponent({
  props: {
    filteredUserId: {
      type: [Number, String] as PropType<number>,
      default: '',
    },
  },

  setup(props, { emit }) {
    const { store, i18n } = useContext()
    const admin = computed(() => store.getters['admin/currentAdmin'])
    const { minutes, fetchChartData } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: i18n.t('card.title.minutes'),
      icon: 'mdi-post-outline',
    })

    const queryAddition = computed(() => {
      if (props.filteredUserId) {
        return `created_by_table=meeting_records&created_by=${String(
          props.filteredUserId
        )}`
      } else {
        return undefined
      }
    })

    watch(
      () => admin.value,
      async (admin) => {
        if (!!admin && !!admin.jwt) {
          await fetchChartData('minutes', queryAddition.value).then(() => {
            loading.value = false
            if (minutes.value && minutes.value.datasets.length) {
              const data = minutes.value.datasets[0].data
              const count = data.reduce(
                (previousValue: number, currentValue: number) => {
                  return previousValue + currentValue
                },
                0
              )
              emit('fetched', {
                count,
                loading: loading.value,
              })
            } else {
              emit('fetched', {
                count: 0,
                loading: loading.value,
              })
            }
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
