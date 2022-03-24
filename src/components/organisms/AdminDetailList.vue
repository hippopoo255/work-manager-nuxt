<template>
  <div class="l-authenticatable">
    <AuthenticatableCard :authenticatable="admin" :menus="menus">
      <template slot="authenticatable-content">
        <div class="u-mt-8">
          <div class="u-w-450-center">
            <TabList :tabs="tabs" :tab-click="handleSwitch" fixed-tabs />
          </div>
          <div class="mt-6 mt-md-9">
            <AuthenticatableProfile
              v-show="currentTabId === 1"
              :authenticatable="admin"
              :loading="loading"
            />
            <ActivityContent
              v-show="currentTabId === 2"
              authenticatable="admin"
            />
          </div>
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
import { useAdmin } from '@/hooks'
import { Admin } from '~/types/ts-axios'
import { faceUrl } from '@/lib/util'
import { tabList, switchTab } from '@/config'

export default defineComponent({
  name: 'AdminDetailList',
  setup() {
    const { show } = useAdmin()
    const { store, i18n } = useContext()
    const route = useRoute()
    const loading = ref(true)
    const admin = ref<Admin | null>(null)

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
          loading.value = false
        }
      },
      { immediate: true }
    )

    // タブ切り替え
    const tabs = tabList.adminDetail(i18n)
    const currentTabId = ref(1)
    const handleSwitch = (id?: number) => {
      switchTab(currentTabId, id)
    }

    return {
      admin,
      bgPath,
      facePath,
      loading,
      menus,
      tabs,
      handleSwitch,
      currentTabId,
    }
  },
})
</script>
