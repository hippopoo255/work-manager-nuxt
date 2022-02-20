<template>
  <BaseFormCard :title="$t('page.title.signup')" @submit="signup">
    <template slot="form-content">
      <v-text-field
        v-model="email"
        :rules="rules.email"
        :label="$t('attribute.email')"
        required
      ></v-text-field>
      <v-text-field
        v-model="login_id"
        :counter="$formCounter.login_id[1]"
        :rules="rules.login_id"
        :label="$t('attribute.login_id')"
        required
      ></v-text-field>
      <!-- TODO:  -->
      <div>ここにパスワードの説明を入れる</div>
      <v-text-field
        v-model="password"
        :counter="$formCounter.password[1]"
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
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { signupRule } from '@/config/validationRule'
export default defineComponent({
  name: 'SignupForm',
  setup() {
    const { i18n } = useContext()
    const form = ref<any>(null)
    const email = ref('')
    const login_id = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const rules = ref(signupRule(i18n))
    const signup = async () => {}
    return {
      email,
      form,
      login_id,
      password,
      password_confirmation,
      rules,
      signup,
    }
  },
})
</script>
