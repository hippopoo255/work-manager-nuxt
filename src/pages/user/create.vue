<template>
  <div class="text-center p-form">
    <h2 class="c-page-title">{{ $t('page.title.user.create') }}</h2>
    <UserForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserCreate',
  setup() {},
})
</script>
