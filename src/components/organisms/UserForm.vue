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
      <v-row dense>
        <v-col cols="12">
          <v-autocomplete
            ref="departmentId"
            v-model="department_id"
            :rules="rules.department_id"
            :items="list"
            :label="$t('attribute.department_id')"
            :filter="searchDepartment"
            item-text="name"
            item-value="id"
            placeholder="Select..."
            required
          >
            <template #item="department">
              <template>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="department.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="department.item.department_code"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
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
import { useMaster, useUser } from '@/hooks'
import { User, UserInputs } from '@/types/ts-axios'

export default defineComponent({
  name: 'UserForm',
  props: {
    user: { type: [Object, String] as PropType<User | ''>, default: '' },
  },
  setup(props) {
    const { app, i18n, redirect, store } = useContext()
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const { save } = useUser()
    const { list, index } = useMaster('department')
    const form = ref<any>(null)
    const id = ref<number | undefined>(undefined)
    const email = ref('')
    const family_name = ref('')
    const family_name_kana = ref('')
    const given_name = ref('')
    const given_name_kana = ref('')
    const department_id = ref(0)
    const loading = ref(false)
    const title = computed(() =>
      id.value === undefined ? i18n.t('page.title.user.create') : username.value
    )
    const submitText = computed(() =>
      id.value === undefined ? i18n.t('submit.create') : i18n.t('submit.update')
    )

    const username = computed(() =>
      props.user ? props.user.full_name : i18n.t('page.title.user.edit')
    )

    const searchDepartment = (item: any, queryText: string, itemText: string) =>
      itemText.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) ||
      item.department_code
        .toLocaleLowerCase()
        .includes(queryText.toLocaleLowerCase())

    const rules = ref(userCreateRule(i18n))

    const fetch = async () => {
      if (props.user) {
        id.value = props.user.id
        email.value = props.user.email || ''
        family_name.value = props.user.family_name
        family_name_kana.value = props.user.family_name_kana
        given_name.value = props.user.given_name
        given_name_kana.value = props.user.given_name_kana
        department_id.value = props.user.department?.id || 0
      }
      await index()
    }

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await fetch()
        }
      },
      { immediate: true }
    )

    const create = async () => {
      loading.value = true
      const data: UserInputs = {
        email: email.value,
        family_name: family_name.value,
        family_name_kana: family_name_kana.value,
        given_name: given_name.value,
        given_name_kana: given_name_kana.value,
      }
      if (department_id.value !== 0) {
        data.department_id = department_id.value
      }

      await save(data, id.value)
        .then(() => {
          setTimeout(() => {
            redirect(app.localePath('user'))
          }, 4000)
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
      department_id,
      list,
      rules,
      create,
      loading,
      submitText,
      title,
      searchDepartment,
    }
  },
})
</script>
