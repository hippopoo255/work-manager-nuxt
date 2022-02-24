<template>
  <BaseFormCard :title="title" @submit="update">
    <template slot="form-content">
      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="family_name"
            :rules="rules.family_name"
            :label="$t('attribute.family_name')"
            required
            autofocus
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
import { useAuth } from '@/hooks'
import { Admin } from '@/types/ts-axios'

export default defineComponent({
  name: 'ProfileForm',
  props: {
    admin: { type: [Object, String] as PropType<Admin | ''>, default: '' },
    title: { type: String as PropType<string>, default: 'Form' },
  },
  setup(props) {
    const { i18n } = useContext()
    const { updateProfile } = useAuth()
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

    const update = async () => {
      if (id.value !== undefined) {
        loading.value = true

        const data = {
          family_name: family_name.value,
          family_name_kana: family_name_kana.value,
          given_name: given_name.value,
          given_name_kana: given_name_kana.value,
          // delete_flag
          // file
        }

        await updateProfile(data, id.value).finally(() => {
          loading.value = false
        })
      }
    }
    return {
      family_name,
      family_name_kana,
      given_name,
      given_name_kana,
      loading,
      rules,
      submitText,
      update,
    }
  },
})
</script>
