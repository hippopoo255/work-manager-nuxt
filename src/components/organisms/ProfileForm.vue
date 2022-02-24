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
      <div class="avatar-setting-box">
        <v-file-input
          ref="fileInputRef"
          v-model="file"
          :rules="rules.file"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          class="hidden"
          @change="handleFileChange"
        ></v-file-input>
      </div>
      <div class="avatar-preview-box">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-avatar
              size="128"
              color="#A5BDC7"
              v-bind="attrs"
              @click.stop="handleTrigger"
              v-on="on"
            >
              <v-img v-if="!!preview" :src="preview" />
              <v-icon v-else x-large color="white">mdi-cloud-upload</v-icon>
            </v-avatar>
          </template>
          <span>{{ $t('submit.upload') }}</span>
        </v-tooltip>
      </div>
      <p
        class="avatar-clear-text text-body-2 primary--text"
        :class="disabled"
        @click="clear"
      >
        {{ $t('submit.clearUpload') }}
      </p>
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
import { useAuth } from '@/hooks'
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
    const delete_flag = ref<'1' | '0'>('0')
    const file = ref<any>(null)
    const fileBufferData = ref<any>(null)
    const fileInputRef = ref()
    const preview = ref<string>('')
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

    const handleTrigger = () => {
      const fileInputRefField = fileInputRef.value
      if (fileInputRefField) {
        fileInputRefField.$refs.input.click()
      }
    }

    const handleFileChange = (e: Blob) => {
      setFileData(e)
      setPreview(e)
      delete_flag.value = '0'
    }

    const setFileData = (e: Blob) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        fileBufferData.value = ev.target!.result
      }
      reader.readAsArrayBuffer(e)
    }

    const setPreview = (e: Blob) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (typeof ev.target!.result === 'string') {
          preview.value = ev.target!.result
        }
      }
      reader.readAsDataURL(e)
    }

    const clear = () => {
      file.value = null
      fileBufferData.value = null
      preview.value = ''
      delete_flag.value = '1'
    }

    const disabled = computed(() => ({
      '--disabled': preview.value === '',
    }))

    const update = async () => {
      if (id.value !== undefined) {
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
            new Blob([fileBufferData.value], { type: file.value.type }),
            file.value.name
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
    }
    return {
      clear,
      disabled,
      family_name,
      family_name_kana,
      file,
      fileInputRef,
      given_name,
      given_name_kana,
      loading,
      rules,
      submitText,
      handleFileChange,
      handleTrigger,
      update,
      preview,
    }
  },
})
</script>

<style lang="scss">
.hidden {
  opacity: 0;
  pointer-events: none;
  height: 0;
  padding: 0;
}
.avatar-setting-box {
  position: relative;
}
.avatar-preview-box {
  max-width: 128px;
  margin: 16px auto;
  cursor: pointer;
}
p.avatar-clear-text {
  cursor: pointer;
  transition: 0.2s;
  margin-bottom: 32px;
  &:hover {
    opacity: 0.8;
  }
  &.--disabled {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
