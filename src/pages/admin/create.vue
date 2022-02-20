<template>
  <div class="text-center p-form">
    <h2 class="c-page-title">{{ $t('page.title.admin.create') }}</h2>
    <AdminForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'AdminCreate',
  layout: 'default',
  setup() {},
})
</script>
