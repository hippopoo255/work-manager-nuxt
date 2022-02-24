<template>
  <BaseFormCard :title="title" @submit="create">
    <template slot="form-content">
      <v-text-field
        v-model="email"
        :rules="rules.email"
        :label="$t('attribute.email')"
        required
        autofocus
      ></v-text-field>
      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="family_name"
            :rules="rules.family_name"
            :label="$t('attribute.family_name')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="given_name"
            :rules="rules.given_name"
            :label="$t('attribute.given_name')"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="family_name_kana"
            :rules="rules.family_name_kana"
            :label="$t('attribute.family_name_kana')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="given_name_kana"
            :rules="rules.given_name_kana"
            :label="$t('attribute.given_name_kana')"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="submitText" />
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { adminCreateRule } from '@/config/validationRule'
import { useAdmin } from '@/hooks'
import { Admin } from '@/types/ts-axios'

export default defineComponent({
  name: 'AdminForm',
  props: {
    admin: { type: [Object, String] as PropType<Admin | ''>, default: '' },
    title: { type: String as PropType<string>, default: 'Form' },
  },
  setup(props) {
    const { app, i18n, redirect } = useContext()
    const { save } = useAdmin()
    const id = ref<number | undefined>(undefined)
    const email = ref('')
    const family_name = ref('')
    const family_name_kana = ref('')
    const given_name = ref('')
    const given_name_kana = ref('')
    const submitText = computed(() =>
      id.value === undefined ? i18n.t('submit.create') : i18n.t('submit.update')
    )
    const loading = ref(false)

    const rules = ref(adminCreateRule(i18n))

    const fetch = () => {
      if (props.admin) {
        id.value = props.admin.id
        email.value = props.admin.email || ''
        family_name.value = props.admin.family_name
        family_name_kana.value = props.admin.family_name_kana
        given_name.value = props.admin.given_name
        given_name_kana.value = props.admin.given_name_kana
      }
    }

    watch(
      () => props.admin,
      () => fetch(),
      { immediate: true }
    )

    const create = async () => {
      loading.value = true

      const data = {
        email: email.value,
        family_name: family_name.value,
        family_name_kana: family_name_kana.value,
        given_name: given_name.value,
        given_name_kana: given_name_kana.value,
      }

      await save(data, id.value)
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
      create,
      email,
      family_name,
      family_name_kana,
      given_name,
      given_name_kana,
      loading,
      rules,
      submitText,
    }
  },
})
</script>
