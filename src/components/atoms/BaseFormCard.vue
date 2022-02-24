<template>
  <v-card :elevation="elevation">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="handleSubmit"
    >
      <v-card-text class="pa-4 pa-sm-8">
        <h3 class="c-page-title">{{ title }}</h3>
        <slot name="form-content" />
        <slot name="form-bottom" />
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'BaseFormCard',
  props: {
    title: { type: String as PropType<string>, required: true },
    elevation: { type: Number as PropType<number>, default: 2 },
  },
  setup(_props, context) {
    const form = ref<any>(null)
    const valid = ref<boolean>(true)
    const handleSubmit = () => {
      if (!form.value.validate()) {
        return false
      }
      context.emit('submit')
    }
    return {
      form,
      handleSubmit,
      valid,
    }
  },
})
</script>
