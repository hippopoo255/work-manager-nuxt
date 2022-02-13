<template>
  <v-row align="center">
    <v-col cols="12">
      <div class="text-center p-form">
        <h2 class="c-page-title">{{ $t('page.title.password-reset') }}</h2>
        <ResetForgottenPasswordForm />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'PasswordReset',
  layout: 'GuestLayout',
  setup() {},
})
</script>
