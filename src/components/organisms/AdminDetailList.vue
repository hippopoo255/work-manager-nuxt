<template>
  <div class="l-authenticatable">
    <AuthenticatableCard
      :authenticatable="admin"
      :menus="menus"
      :activity-count="activities.count"
    >
      <template slot="authenticatable-content">
        <div class="u-mt-8">
          <v-row no-gutters justify="center">
            <v-col cols="12" md="6">
              <h3 class="c-title u-mb-4">アクティビティ</h3>
              <ActivityList :activities="activities" :loading="loading" />
              <MoreLink
                v-if="hasMore"
                :loading="moreLoading"
                @more="handleMore"
              />
            </v-col>
          </v-row>
        </div>
      </template>
    </AuthenticatableCard>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import { useActivity, useAdmin } from '@/hooks'
import { Admin } from '~/types/ts-axios'
import { faceUrl } from '@/lib/util'

export default defineComponent({
  name: 'AdminDetailList',
  setup() {
    const { show } = useAdmin()
    const { store } = useContext()
    const route = useRoute()
    const loading = ref(true)
    const moreLoading = ref(false)
    const admin = ref<Admin | null>(null)
    const { activities, fetchActivities, hasMore } = useActivity('admin')
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const facePath = computed(() =>
      admin.value?.file_path ? faceUrl(admin.value?.file_path) : ''
    )

    const bgPath = computed(() =>
      admin.value?.organization?.file_path
        ? faceUrl(admin.value?.organization?.file_path)
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    )

    const menus = computed(() => [
      // {
      //   btnText: i18n.t('submit.inviteAdmin'),
      //   handle: () => {},
      //   color: 'primary',
      //   disabled: loading.value,
      // },
    ])

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          const param = route.value.params
          await show(Number(param.id)).then((ad) => {
            admin.value = ad
          })
          await fetchActivities(Number(param.id))
          loading.value = false
        }
      },
      { immediate: true }
    )

    const handleMore = async () => {
      moreLoading.value = true
      const param = route.value.params
      await fetchActivities(Number(param.id))
      moreLoading.value = false
    }
    return {
      activities,
      admin,
      bgPath,
      facePath,
      handleMore,
      hasMore,
      loading,
      menus,
      moreLoading,
    }
  },
})
</script>
