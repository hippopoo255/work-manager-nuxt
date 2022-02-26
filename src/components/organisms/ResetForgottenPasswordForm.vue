<template>
  <BaseFormCard
    :title="$t('page.title.password.reset')"
    @submit="resetPassword"
  >
    <template slot="form-content">
      <v-text-field
        v-model="verification_code"
        :rules="rules.verification_code"
        :label="$t('attribute.verification_code')"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="rules.password"
        :label="$t('attribute.password')"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="password_confirmation"
        :rules="rules.password_confirmation(password)"
        :label="$t('attribute.password_confirmation')"
        type="password"
        required
      ></v-text-field>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow
        :loading="loading"
        :submit-value="$t('submit.resetPassword')"
      />
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { resetForgottenPasswordRule } from '@/config/validationRule'
import { useAuth } from '~/hooks'

export default defineComponent({
  name: 'ForgotPasswordForm',
  setup() {
    const { i18n } = useContext()
    const route = useRoute()
    const login_id = ref<string>('')
    const password = ref<string>('')
    const password_confirmation = ref<string>('')
    const verification_code = ref<string>('')
    const loading = ref(false)
    const rules = ref(resetForgottenPasswordRule(i18n))
    const { resetForgottenPassword } = useAuth()

    onMounted(() => {
      const r = route.value
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!r.query.n) {
        login_id.value = String(r.query.n)
      }
    })

    const resetPassword = async () => {
      loading.value = true
      await resetForgottenPassword({
        login_id: login_id.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        verification_code: verification_code.value,
      }).finally(() => {
        loading.value = false
      })
    }

    return {
      login_id,
      loading,
      password,
      password_confirmation,
      rules,
      resetPassword,
      verification_code,
    }
  },
})
</script>
