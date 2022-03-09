<template>
  <div class="text-center p-form">
    <h2 class="c-page-title u-text-center">
      {{ $t('page.title.master.index') }}
    </h2>
    <IconList :icon-list="masterList" link />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { masters } from '@/mock'
export default defineComponent({
  name: 'MasterIndex',
  setup() {
    const masterList = ref(masters)

    return {
      masterList,
    }
  },
})
</script>
