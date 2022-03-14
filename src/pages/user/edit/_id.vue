<template>
  <div class="text-center p-form">
    <h2 class="c-page-title">{{ $t('page.title.user.edit') }}</h2>
    <Loader v-if="loading" />
    <UserForm v-else :user="user" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import { useUser } from '~/hooks'
import { User } from '~/types/ts-axios'
export default defineComponent({
  setup() {
    const { store } = useContext()
    const route = useRoute()
    const { show } = useUser()
    const user = ref<User | null>(null)
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const loading = ref(true)

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin && route.value.params.id) {
          await show(Number(route.value.params.id))
            .then((res) => {
              user.value = res
            })
            .finally(() => {
              loading.value = false
            })
        }
      },
      { immediate: true }
    )

    return {
      user,
      loading,
    }
  },
})
</script>
