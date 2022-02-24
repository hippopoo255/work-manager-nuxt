<template>
  <BaseFormCard :title="''" :elevation="0" @submit="handleSubmit">
    <template slot="form-content">
      <v-card-title class="pa-0">{{
        $t('page.title.setting.notification')
      }}</v-card-title>
    </template>
    <!-- <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="$t('submit.signup')" />
    </template> -->
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { resetPasswordRule } from '@/config/validationRule'
export default defineComponent({
  name: 'NotificationForm',
  setup() {
    const { i18n } = useContext()
    const rule = ref(resetPasswordRule(i18n))
    const handleSubmit = () => {}
    return {
      handleSubmit,
      rule,
    }
  },
})
</script>
