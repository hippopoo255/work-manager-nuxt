<template>
  <div class="text-center p-form">
    <h2 class="c-page-title">{{ $t('page.title.signin') }}</h2>
    <SigninForm />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  computed,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Signin',
  layout: 'GuestLayout',
  setup() {
    const { app, store } = useContext()
    const router = useRouter()

    const admin = computed(() => store.getters['admin/currentAdmin'])
    watch(
      () => admin.value,
      (current) => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!current) {
          router.push(app.localePath('dashboard'))
        }
      },
      { immediate: true }
    )
    return {
      admin,
    }
  },
})
</script>
