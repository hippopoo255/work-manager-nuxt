<template>
  <v-card v-if="user" max-width="400" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <AuthenticatableCard :authenticatable="user" :menus="menus" />
        </v-col>
        <v-col cols="12">
          <!-- TODO: ActivityList -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
import { useAdmin, useUser } from '@/hooks'
import { User } from '~/types/ts-axios'
import { faceUrl } from '~/lib/util'

export default defineComponent({
  name: 'UserDetailList',
  setup() {
    const { show } = useUser()
    const { save } = useAdmin()
    const { store, i18n } = useContext()
    const route = useRoute()
    const loading = ref(false)
    const user = ref<User | null>(null)
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
        alert('このユーザは既に管理者として登録されています。')
        return false
      }
      if (
        confirm('このユーザーにメールが送信されます。招待しますか？') &&
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
        }
        await save(inputs).finally(() => {
          loading.value = false
        })
      }
    }

    const menus = computed(() => [
      {
        btnText:
          user.value && user.value.is_invited
            ? i18n.t('status.inviteAdmin')
            : i18n.t('submit.inviteAdmin'),
        handle: () => handleAlert(),
        color: 'primary',
        disabled: loading.value || (user.value && user.value.is_invited),
      },
    ])

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          const param = route.value.params
          await show(Number(param.id)).then((u) => {
            user.value = u
          })
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
    }
  },
})
</script>
