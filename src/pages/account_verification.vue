<template>
  <div class="text-center p-form">
    <h2 class="c-page-title">{{ $t('page.title.account_verification') }}</h2>
    <AccountVerificationForm />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'GuestLayout',
  setup() {},
})
</script>
