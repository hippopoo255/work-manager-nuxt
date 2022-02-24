<template>
  <BaseFormCard :title="$t('page.title.user.create')" @submit="create">
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
        <v-col>
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
  watch,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { userCreateRule } from '@/config/validationRule'
import { useUser } from '@/hooks'
import { User } from '@/types/ts-axios'

export default defineComponent({
  name: 'UserForm',
  props: {
    user: { type: [Object, String] as PropType<User | ''>, default: '' },
  },
  setup(props) {
    const { app, i18n, redirect } = useContext()
    const { save } = useUser()
    const form = ref<any>(null)
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

    const rules = ref(userCreateRule(i18n))

    const fetch = () => {
      if (props.user) {
        id.value = props.user.id
        email.value = props.user.email || ''
        family_name.value = props.user.family_name
        family_name_kana.value = props.user.family_name_kana
        given_name.value = props.user.given_name
        given_name_kana.value = props.user.given_name_kana
      }
    }

    watch(
      () => props.user,
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

      await save(data)
        .then(() => {
          // console.log(res)
          setTimeout(() => {
            redirect(app.localePath('user'))
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
      submitText,
    }
  },
})
</script>
