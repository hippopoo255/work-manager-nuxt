<template>
  <BaseFormCard
    :title="$t('page.title.password.forgot')"
    @submit="sendVerificationCode"
  >
    <template slot="form-content">
      <v-card-text class="pa-4 pa-sm-8">
        <v-text-field
          v-model="login_id"
          :rules="rules.login_id"
          :label="$t('attribute.email')"
          required
          autofocus
        ></v-text-field>
      </v-card-text>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow
        :loading="loading"
        :submit-value="$t('submit.sendVerificationCode')"
      />
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { forgotPasswordRule } from '@/config/validationRule'
import { useAuth } from '~/hooks'

export default defineComponent({
  name: 'ForgotPasswordForm',
  setup() {
    const { i18n } = useContext()
    const { forgotPassword } = useAuth()
    const login_id = ref('')
    const loading = ref(false)
    const rules = ref(forgotPasswordRule(i18n))

    const sendVerificationCode = async () => {
      loading.value = true
      await forgotPassword({ login_id: login_id.value }).finally(() => {
        loading.value = false
      })
    }

    return {
      sendVerificationCode,
      login_id,
      loading,
      rules,
      forgotPassword,
    }
  },
})
</script>
