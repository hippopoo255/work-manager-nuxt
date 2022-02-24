<template>
  <BaseFormCard :title="$t('page.title.account-verification')" @submit="verify">
    <template slot="form-content">
      <v-text-field
        v-model="verification_code"
        :rules="rules.verification_code"
        :label="$t('attribute.verification_code')"
        required
        autofocus
      ></v-text-field>
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
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { accountVerificationRule } from '@/config/validationRule'
import { decode64 } from '@/lib/util'
import { useAuth } from '~/hooks'

export default defineComponent({
  name: 'ForgotPasswordForm',
  setup() {
    const { i18n } = useContext()
    const route = useRoute()
    const { verifyAdmin } = useAuth()
    const login_id = ref<string>('')
    const password = ref<string>('')
    const password_confirmation = ref<string>('')
    const verification_code = ref<string>('')
    const loading = ref(false)
    const rules = ref(accountVerificationRule(i18n))

    onMounted(() => {
      const r = route.value
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!r.query.n) {
        login_id.value = decode64(String(r.query.n))
      }
    })

    const verify = async () => {
      loading.value = true
      await verifyAdmin({
        login_id: login_id.value,
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
      verify,
      verification_code,
    }
  },
})
</script>
