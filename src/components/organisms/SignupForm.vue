<template>
  <BaseFormCard :title="$t('page.title.signup')" @submit="signUp">
    <template slot="form-content">
      <!-- <v-text-field
        v-model="email"
        :rules="rules.email"
        :label="$t('attribute.email')"
        required
      ></v-text-field> -->
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
    <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="$t('submit.signup')" />
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
import { signupRule } from '@/config/validationRule'
import { decode64 } from '@/lib/util'
import { useAuth } from '~/hooks'

export default defineComponent({
  name: 'SignupForm',
  setup() {
    const { app, i18n } = useContext()
    const { signup } = useAuth()
    const route = useRoute()
    const router = useRouter()
    const email = ref('')
    const family_name = ref('')
    const family_name_kana = ref('')
    const given_name = ref('')
    const given_name_kana = ref('')
    const login_id = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const rules = ref(signupRule(i18n))
    const loading = ref(false)

    onMounted(() => {
      const q = route.value.query
      if (Object.keys(q).length) {
        email.value = decode64(String(q.email)) || ''
        family_name.value = decode64(String(q.family_name)) || ''
        family_name_kana.value = decode64(String(q.family_name_kana)) || ''
        given_name.value = decode64(String(q.given_name)) || ''
        given_name_kana.value = decode64(String(q.given_name_kana)) || ''
      } else {
        router.push(app.localePath('signin'))
      }
    })

    const signUp = async () => {
      loading.value = true

      const inputs = {
        email: email.value,
        login_id: login_id.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        family_name: family_name.value,
        family_name_kana: family_name_kana.value,
        given_name: given_name.value,
        given_name_kana: given_name_kana.value,
      }

      await signup(inputs)
        .catch((error) => {
          return error
        })
        .finally(() => {
          loading.value = false
        })
    }
    return {
      email,
      login_id,
      loading,
      password,
      password_confirmation,
      rules,
      signUp,
    }
  },
})
</script>
