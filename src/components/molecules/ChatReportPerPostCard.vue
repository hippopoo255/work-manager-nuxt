<template>
  <DashboardCard :title="title" resource="chat">
    <Loader v-if="loading" slot="card-content" absolute />
    <div v-else slot="card-content">
      <slot name="option"></slot>
      <HorizontalBarChart :chart-data="chatPerPost" />
    </div>
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
    const { store } = useContext()
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const { chatPerPost, fetchChartData } = useChartData()
    const loading = ref(true)
    const title = ref({
      text: '書き込みごとの報告件数',
      icon: 'mdi-chat-outline',
    })

    const queryAddition = computed(() => {
      if (props.filteredUserId) {
        return `created_by_table=chat_messages&created_by=${String(
          props.filteredUserId
        )}`
      } else {
        return undefined
      }
    })

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          // eslint-disable-next-line no-extra-boolean-cast
          await fetchChartData('chatPerPost', queryAddition.value).then(() => {
            loading.value = false
            if (chatPerPost.value && chatPerPost.value.datasets.length) {
              const data = chatPerPost.value.datasets[0].data
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
      chatPerPost,
      title,
      loading,
    }
  },
})
</script>
