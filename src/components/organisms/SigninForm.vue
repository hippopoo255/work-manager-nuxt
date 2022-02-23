<template>
  <BaseFormCard :title="$t('page.title.signin')" @submit="signIn">
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
            @click="testSignIn"
          >
            {{ $t('submit.testSignin') }}
          </v-btn>
        </v-col>
      </FormSubmitRow>
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { signinRule } from '@/config/validationRule'
import { useAuth } from '~/hooks'

export default defineComponent({
  name: 'SigninForm',
  setup() {
    const { i18n } = useContext()
    const { signin, testSignin } = useAuth()
    const login_id = ref('')
    const password = ref('')
    const loading = ref(false)
    const rules = ref(signinRule(i18n))

    const signIn = async () => {
      loading.value = true
      await signin({
        login_id: login_id.value,
        password: password.value,
      }).finally(() => {
        loading.value = false
      })
    }

    const testSignIn = async () => {
      loading.value = true
      await testSignin().finally(() => {
        loading.value = false
      })
    }

    return {
      // form,
      login_id,
      loading,
      password,
      rules,
      signIn,
      testSignIn,
      // valid,
    }
  },
})
</script>
