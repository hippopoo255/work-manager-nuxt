<template>
  <v-row :justify="justify" class="mt-4 mt-md-6">
    <v-col cols="12">
      <v-btn
        color="primary"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        {{ submitValue }}
      </v-btn>
    </v-col>
    <slot name="else-rows"></slot>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'FormSubmitRow',
  props: {
    justify: { type: String as PropType<string>, default: 'center' },
    submitValue: { type: String as PropType<string>, default: '保存' },
    loading: { type: Boolean as PropType<boolean>, default: false },
  },
  setup(_props) {},
})
</script>
