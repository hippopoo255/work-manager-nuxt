<template>
  <v-row align="center">
    <v-col cols="12">
      <div class="text-center p-form">
        <h2 class="c-page-title">{{ $t('page.title.password-forgot') }}</h2>
        <ForgotPasswordForm />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  computed,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PasswordForgot',
  layout: 'GuestLayout',
  setup() {
    const { app, store, redirect } = useContext()

    const admin = computed(() => store.getters['admin/currentAdmin'])
    watch(
      () => admin.value,
      (current) => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!current.value) {
          redirect(app.localePath('dashboard'))
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
