<template>
  <div>
    <h2 class="c-page-title u-text-center">
      {{ $t('page.title.blog.index') }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'BlogIndex',
  layout: 'default',
  setup() {},
})
</script>
