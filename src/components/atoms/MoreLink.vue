<template>
  <div class="mt-6 u-text-center">
    <v-btn
      outlined
      :color="color"
      :loading="loading"
      @click.stop="$emit('more')"
    >
      {{ $t('link.moreLink') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    loading: { type: Boolean as PropType<boolean>, default: false },
    color: { type: String as PropType<string>, default: 'primary' },
  },
  setup() {},
})
</script>
