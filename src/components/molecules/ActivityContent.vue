<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" md="6">
      <div class="u-w-450-center">
        <!-- <h3 class="c-title u-mb-4">
          {{ $t('page.title.user.activity') }}
        </h3> -->
        <Loader v-if="loading" />
        <div v-else>
          <ActivityList :activities="activities" />
          <MoreLink v-if="hasMore" :loading="moreLoading" @more="handleMore" />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  useContext,
  ref,
  useRoute,
  PropType,
} from '@nuxtjs/composition-api'
import { useActivity } from '@/hooks'

export default defineComponent({
  props: {
    authenticatable: {
      type: String as PropType<'admin' | 'user'>,
      default: 'user',
    },
  },
  setup(props) {
    const { activities, fetchActivities, hasMore } = useActivity(
      props.authenticatable
    )
    const route = useRoute()
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const loading = ref(true)
    const moreLoading = ref(false)
    const { store } = useContext()

    const handleMore = async () => {
      moreLoading.value = true
      const param = route.value.params
      await fetchActivities(Number(param.id))
      moreLoading.value = false
    }

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          const param = route.value.params
          await fetchActivities(Number(param.id)).then(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      handleMore,
      activities,
      hasMore,
      loading,
      moreLoading,
    }
  },
})
</script>

<style scoped></style>
