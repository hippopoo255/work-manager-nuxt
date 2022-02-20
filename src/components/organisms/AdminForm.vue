<template>
  <BaseFormCard :title="$t('page.title.admin.create')" @submit="create">
    <template slot="form-content">
      <v-text-field
        v-model="email"
        :rules="rules.email"
        :label="$t('attribute.email')"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="family_name"
        :rules="rules.family_name"
        :label="$t('attribute.family_name')"
        required
      ></v-text-field>
      <v-text-field
        v-model="given_name"
        :rules="rules.given_name"
        :label="$t('attribute.given_name')"
        required
      ></v-text-field>
      <v-text-field
        v-model="family_name_kana"
        :rules="rules.family_name_kana"
        :label="$t('attribute.family_name_kana')"
        required
      ></v-text-field>
      <v-text-field
        v-model="given_name_kana"
        :rules="rules.given_name_kana"
        :label="$t('attribute.given_name_kana')"
        required
      ></v-text-field>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="$t('submit.create')" />
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { adminCreateRule } from '@/config/validationRule'
import { useAdmin } from '@/hooks'
export default defineComponent({
  name: 'AdminForm',
  setup() {
    const { app, i18n, redirect } = useContext()
    const { save } = useAdmin()
    const form = ref<any>(null)
    const email = ref('')
    const family_name = ref('')
    const family_name_kana = ref('')
    const given_name = ref('')
    const given_name_kana = ref('')
    const loading = ref(false)

    const rules = ref(adminCreateRule(i18n))

    const create = async () => {
      loading.value = true

      const data = {
        email: email.value,
        family_name: family_name.value,
        family_name_kana: family_name_kana.value,
        given_name: given_name.value,
        given_name_kana: given_name_kana.value,
      }

      await save(data)
        .then(() => {
          setTimeout(() => {
            redirect(app.localePath('admin'))
          }, 5000)
        })
        .finally(() => {
          loading.value = false
        })
    }
    return {
      email,
      form,
      family_name,
      family_name_kana,
      given_name,
      given_name_kana,
      rules,
      create,
      loading,
    }
  },
})
</script>
