<template>
  <div class="p-form">
    <h2 class="c-page-title text-center">
      {{ $t('page.title.setting.index') }}
    </h2>
    <SettingForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SettingIndex',
  setup() {},
})
</script>
