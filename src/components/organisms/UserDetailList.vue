<template>
  <v-card max-width="400" class="mx-auto">
    <v-container>
      <v-row v-if="user" dense>
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
import { APP_STORAGE_URL } from '@/config'
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
    const facePath = computed(() => {
      return APP_STORAGE_URL + `/${user.value?.file_path}`
    })
    const bgPath = computed(() => {
      return user.value?.organization?.file_path
        ? APP_STORAGE_URL + `/${user.value.organization.file_path}`
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    })

    const alert = async () => {
      if (
        confirm('このユーザーにメールが送信されます。招待しますか？') &&
        user.value
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
        btnText: i18n.t('submit.inviteAdmin'),
        handle: () => alert(),
        color: 'primary',
        disabled: loading.value,
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
      alert,
      bgPath,
      facePath,
      loading,
      menus,
      user,
    }
  },
})
</script>
