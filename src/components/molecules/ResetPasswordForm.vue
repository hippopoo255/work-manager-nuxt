<template>
  <BaseFormCard :title="''" :elevation="0" @submit="handleSubmit">
    <template slot="form-content">
      <v-card-title class="pa-0">{{
        $t('page.title.setting.password')
      }}</v-card-title>
      <v-text-field
        v-model="old_password"
        type="password"
        :rules="rules.old_password"
        :label="$t('attribute.old_password')"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :counter="$formCounter.password[1]"
        :rules="rules.password"
        :label="$t('attribute.new_password')"
        required
      ></v-text-field>
      <v-text-field
        v-model="password_confirmation"
        type="password"
        :rules="rules.password_confirmation(password)"
        :label="$t('attribute.password_confirmation')"
        required
      ></v-text-field>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow
        :loading="loading"
        :submit-value="$t('submit.changePassword')"
        class="text-center"
      />
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { resetPasswordRule } from '@/config/validationRule'
import { useAuth } from '@/hooks'

export default defineComponent({
  name: 'ChangePasswordForm',
  setup() {
    const { i18n } = useContext()
    const rules = ref(resetPasswordRule(i18n))
    const old_password = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const loading = ref(false)
    const { resetPassword } = useAuth()
    const handleSubmit = async () => {
      loading.value = true
      const inputs = {
        old_password: old_password.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      }
      await resetPassword(inputs).finally(() => {
        loading.value = false
      })
    }
    return {
      old_password,
      password,
      password_confirmation,
      handleSubmit,
      loading,
      rules,
    }
  },
})
</script>
