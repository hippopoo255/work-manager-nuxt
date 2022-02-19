<template>
  <BaseFormCard :title="$t('page.title.signin')" @submit="signin">
    <template slot="form-content">
      <v-text-field
        v-model="login_id"
        :rules="rules.login_id"
        :label="$t('attribute.both')"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="rules.password"
        :label="$t('attribute.password')"
        required
        type="password"
      ></v-text-field>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="$t('submit.signin')">
        <v-col slot="else-rows" cols="12" class="mt-xs-4">
          <NuxtLink :to="localePath('password-forgot')">{{
            $t('link.password-forgot')
          }}</NuxtLink>
          <v-btn
            class="ml-2"
            type="button"
            outlined
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="testSignin"
          >
            {{ $t('submit.testSignin') }}
          </v-btn>
        </v-col>
      </FormSubmitRow>
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import { signinRule } from '@/config/validationRule'

export default defineComponent({
  name: 'SigninForm',
  setup() {
    const { i18n, store, app } = useContext()
    const router = useRouter()
    const login_id = ref('')
    const password = ref('')
    const loading = ref(false)
    const rules = ref(signinRule(i18n))

    const signin = async () => {
      loading.value = true
      const loggedInAdmin = await store.dispatch('admin/signin', {
        login_id: login_id.value,
        password: password.value,
      })
      loading.value = false
      if (loggedInAdmin) {
        router.push(app.localePath('dashboard'))
      }
    }
    const testSignin = async () => {
      loading.value = true
      const loggedInAdmin = await store.dispatch('admin/testSignin')
      loading.value = false
      if (loggedInAdmin) {
        router.push(app.localePath('dashboard'))
      }
    }

    return {
      // form,
      login_id,
      loading,
      password,
      rules,
      signin,
      testSignin,
      // valid,
    }
  },
})
</script>
