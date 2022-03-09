<template>
  <div>
    <h2 class="c-page-title text-center">
      {{ $t('page.title.user.index') }}
    </h2>
    <Loader v-if="loading" />
    <AuthenticatableTable v-else :headers="headers" :items="users" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { useUser } from '~/hooks'
import { User } from '~/types/ts-axios'
import { userTableHeaders } from '@/config/table'

export default defineComponent({
  name: 'UserIndex',
  setup() {
    const { index } = useUser()
    const { i18n, store } = useContext()
    const loading = ref(true)

    const users = ref<User[]>([])
    const isSignin = computed(() => store.getters['admin/isSignin'])

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await index()
            .then((u) => {
              users.value = u
            })
            .finally(() => {
              loading.value = false
            })
        }
      },
      { immediate: true }
    )
    const headers = computed(() => userTableHeaders.index(i18n))
    return {
      headers,
      loading,
      users,
    }
  },
})
</script>
