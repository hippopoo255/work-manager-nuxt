<template>
  <div>
    <v-file-input
      ref="fileInputRef"
      v-model="fileInputValue"
      :rules="rules || defaultRule"
      :accept="accept"
      class="hidden"
      @change="(e) => $emit('change', { e, fileInputValue })"
    ></v-file-input>
    <div class="avatar-preview-box">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-avatar
            :size="avatar.size || 128"
            :color="avatar.color || '#A5BDC7'"
            v-bind="attrs"
            @click.stop="handleTrigger"
            v-on="on"
          >
            <v-img v-if="!!preview" :src="preview" />
            <v-icon v-else x-large color="white">{{
              avatar.icon || 'mdi-camera-outline'
            }}</v-icon>
          </v-avatar>
        </template>
        <span>{{ avatar.tooltip || $t('submit.upload') }}</span>
      </v-tooltip>
    </div>
    <p
      class="avatar-clear-text text-body-2 primary--text"
      :class="disabled"
      @click="$emit('clear')"
    >
      {{ $t('submit.clearUpload') }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { profileRule } from '@/config/validationRule'

type AvatarOption = {
  color?: string
  size?: number
  icon?: string
  tooltip?: string
}

export default defineComponent({
  name: 'FileInput',
  layout: 'default',
  props: {
    accept: {
      type: String as PropType<string>,
      default: 'image/png, image/jpeg, image/gif',
    },
    avatar: {
      type: Object as PropType<AvatarOption>,
      default: () => ({}),
    },
    rules: {
      type: [Array, null] as PropType<any[]>,
      default: null,
    },
    preview: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const { i18n } = useContext()
    const defaultRule = ref(profileRule(i18n).file)
    const disabled = computed(() => ({
      '--disabled': props.preview === '',
    }))
    const fileInputValue = ref<File | null>(null)
    const fileInputRef = ref()
    const handleTrigger = () => {
      const fileInputRefField = fileInputRef.value
      if (fileInputRefField) {
        fileInputRefField.$refs.input.click()
      }
    }
    return {
      defaultRule,
      disabled,
      fileInputValue,
      fileInputRef,
      handleTrigger,
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
