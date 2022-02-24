<template>
  <BaseFormCard :title="''" :elevation="0" @submit="handleSubmit">
    <template slot="form-content">
      <!-- テーマ設定 -->
      <v-card-title class="pa-0">{{ $t('app.theme') }}</v-card-title>
      <ThemeToggler />
      <v-divider class="my-8"></v-divider>
      <!-- 言語設定 -->
      <v-card-title class="pa-0">{{ $t('app.locale') }}</v-card-title>
      <LocaleDropBox class="mt-4" />
    </template>
    <!-- <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="$t('submit.signup')" />
    </template> -->
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'CommonSettingForm',
  setup(_props) {
    const loading = ref(false)

    const handleSubmit = () => {}
    return {
      loading,
      handleSubmit,
    }
  },
})
</script>
<style lang="scss">
.v-select__selection {
  line-height: 1.5;
}
</style>
