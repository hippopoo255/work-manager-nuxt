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
      <FileInput
        :rules="rules.file"
        :preview="preview"
        @change="handleFileChange"
        @clear="clear"
      />
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
import { profileRule } from '@/config/validationRule'
import { useAuth, useFile } from '@/hooks'
import { Admin } from '@/types/ts-axios'
import { faceUrl } from '~/lib/util'

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
    // 画像のアップロード
    const file = ref<File | null>(null)
    const fileBufferData = ref<any>(null)
    const delete_flag = ref<'1' | '0'>('0')
    const { clear, handleFileChange, preview } = useFile(
      file,
      fileBufferData,
      delete_flag
    )
    const submitText = computed(() =>
      id.value === undefined ? i18n.t('submit.create') : i18n.t('submit.update')
    )
    const loading = ref(false)

    const rules = ref(profileRule(i18n))

    const fetch = () => {
      if (props.admin) {
        id.value = props.admin.id
        email.value = props.admin.email || ''
        family_name.value = props.admin.family_name
        family_name_kana.value = props.admin.family_name_kana
        given_name.value = props.admin.given_name
        given_name_kana.value = props.admin.given_name_kana
        preview.value = props.admin.file_path
          ? faceUrl(props.admin.file_path)
          : ''
      }
    }

    watch(
      () => props.admin,
      () => fetch(),
      { immediate: true }
    )

    const update = async () => {
      if (id.value === undefined) {
        return false
      }
      loading.value = true
      const data = new FormData()
      data.append('family_name', family_name.value)
      data.append('family_name_kana', family_name_kana.value)
      data.append('given_name', given_name.value)
      data.append('given_name_kana', given_name_kana.value)
      data.append('delete_flag', delete_flag.value)
      if (fileBufferData.value) {
        data.append(
          'file',
          new Blob([fileBufferData.value], { type: file.value?.type }),
          file.value?.name
        )
      }

      await updateProfile(data, id.value)
        .then(() => {
          file.value = null
          fileBufferData.value = null
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      clear,
      family_name,
      family_name_kana,
      file,
      given_name,
      given_name_kana,
      loading,
      rules,
      submitText,
      handleFileChange,
      update,
      preview,
    }
  },
})
</script>
