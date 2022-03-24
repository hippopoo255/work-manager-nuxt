<template>
  <div class="l-authenticatable">
    <AuthenticatableCard :authenticatable="user" :menus="menus">
      <template slot="authenticatable-content">
        <div class="mt-8 mt-md-12">
          <div class="u-w-450-center">
            <TabList :tabs="tabs" :tab-click="handleSwitch" fixed-tabs />
          </div>
          <div class="mt-6 mt-md-9">
            <UserScore v-show="currentTabId === 1" :user="user" />
            <AuthenticatableProfile
              v-show="currentTabId === 2"
              :authenticatable="user"
              :loading="loading"
            />
            <ActivityContent v-show="currentTabId === 3" />
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
  useRouter,
} from '@nuxtjs/composition-api'
import { useAdmin, useUser } from '@/hooks'
import { User } from '~/types/ts-axios'
import { faceUrl } from '~/lib/util'
import { tabList, switchTab } from '@/config'

export default defineComponent({
  name: 'UserDetailList',
  setup() {
    const { show } = useUser()
    const { save } = useAdmin()
    const { app, store, i18n } = useContext()
    const route = useRoute()
    const router = useRouter()
    const user = ref<User | null>(null)
    const loading = ref(true)

    const isSignin = computed(() => store.getters['admin/isSignin'])
    const facePath = computed(() =>
      user.value?.file_path ? faceUrl(user.value?.file_path) : ''
    )
    const bgPath = computed(() => {
      return user.value?.organization?.file_path
        ? faceUrl(user.value.organization.file_path)
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    })

    const handleAlert = async () => {
      if (user.value && user.value.is_invited) {
        alert(i18n.t('alert.modal.invite'))
        return false
      }
      if (
        confirm(String(i18n.t('confirm.invite'))) &&
        user.value &&
        !user.value.is_invited
      ) {
        loading.value = true

        const inputs = {
          email: user.value?.email || '',
          family_name: user.value?.family_name,
          family_name_kana: user.value?.family_name_kana,
          given_name: user.value?.given_name,
          given_name_kana: user.value?.given_name_kana,
          department_id: user.value?.department?.id,
          organization_id: user.value?.organization_id,
        }
        await save(inputs).finally(() => {
          loading.value = false
        })
      }
    }

    const menus = computed(() => [
      {
        btnText: i18n.t('link.edit.profile'),
        handle: () => {
          if (user.value) {
            router.push(
              app.localePath({
                name: 'user-edit-id',
                params: {
                  id: String(user.value.id),
                },
              })
            )
          }
        },
      },
      {
        btnText:
          user.value && user.value.is_invited
            ? i18n.t('status.inviteAdmin')
            : i18n.t('submit.inviteAdmin'),
        handle: () => handleAlert(),
        // color: 'primary',
        disabled: loading.value || (user.value && user.value.is_invited),
      },
    ])

    // タブ切り替え
    const tabs = tabList.userDetail(i18n)
    const currentTabId = ref(1)
    const handleSwitch = (id?: number) => {
      switchTab(currentTabId, id)
    }

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          const param = route.value.params
          await show(Number(param.id)).then((u) => {
            user.value = u
          })
          // await fetchActivities(Number(param.id))
          loading.value = false
        }
      },
      { immediate: true }
    )

    return {
      bgPath,
      facePath,
      loading,
      menus,
      user,
      tabs,
      handleSwitch,
      currentTabId,
    }
  },
})
</script>
<style lang="scss">
.wrap {
  max-width: 600px;
  margin: 0 auto 36px;
}
</style>
