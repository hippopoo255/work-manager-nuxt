<template>
  <div>
    <h2 class="c-page-title text-center">{{ $t('page.title.admin.id') }}</h2>
    <AdminDetailList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'AdminId',
  layout: 'default',
  setup() {},
})
</script>

<style scoped></style>
