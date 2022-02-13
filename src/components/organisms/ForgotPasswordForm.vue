<template>
  <BaseFormCard
    :title="$t('page.title.password-forgot')"
    @submit="forgotPassword"
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
        <v-row justify="center">
          <v-col cols="12">
            <v-btn
              class="mt-4"
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              {{ $t('submit.sendVerificationCode') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
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
import { forgotPasswordRule } from '@/config'
import { encode64 } from '@/lib/util'

export default defineComponent({
  name: 'ForgotPasswordForm',
  setup() {
    const { i18n, store, app } = useContext()
    const router = useRouter()
    const login_id = ref('')
    const loading = ref(false)
    const rules = ref(forgotPasswordRule(i18n))

    const forgotPassword = async () => {
      loading.value = true
      const resMessage = await store.dispatch('admin/forgotPassword', {
        login_id: login_id.value,
      })

      if (resMessage === 'SUCCESS') {
        setTimeout(() => {
          router.push(
            app.localePath({
              name: 'password-reset',
              query: {
                n: encode64(login_id.value),
              },
            })
          )
        }, 4000)
      } else {
        loading.value = false
      }
    }

    return {
      login_id,
      loading,
      rules,
      forgotPassword,
    }
  },
})
</script>

<style scoped></style>
