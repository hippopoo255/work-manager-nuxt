<template>
  <BaseFormCard
    :title="$t('page.title.password-reset')"
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
      <v-row justify="center">
        <v-col cols="12">
          <v-btn
            class="mt-4"
            color="primary"
            type="submit"
            :loading="loading"
            :disabled="loading"
          >
            {{ $t('submit.resetPassword') }}
          </v-btn>
        </v-col>
      </v-row>
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
  useRouter,
} from '@nuxtjs/composition-api'
import { resetForgottenPasswordRule } from '@/config'

export default defineComponent({
  name: 'ForgotPasswordForm',
  setup() {
    const { i18n, store, app } = useContext()
    const router = useRouter()
    const route = useRoute()
    const login_id = ref<string>('')
    const password = ref<string>('')
    const password_confirmation = ref<string>('')
    const verification_code = ref<string>('')
    const loading = ref(false)
    const rules = ref(resetForgottenPasswordRule(i18n))

    onMounted(() => {
      const r = route.value
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!r.query.n) {
        login_id.value = String(r.query.n)
      }
    })

    const resetPassword = async () => {
      loading.value = true
      const responseMsg = await store.dispatch('admin/resetForgottenPassword', {
        login_id: login_id.value,
        password: password.value,
        verification_code: verification_code.value,
      })
      loading.value = false
      if (responseMsg === 'SUCCESS') {
        router.push(app.localePath('signin'))
      }
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

<style scoped></style>
