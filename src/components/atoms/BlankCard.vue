<template>
  <v-card>
    <v-card-title :class="titleModifier">
      <slot name="card-title" />
    </v-card-title>
    <v-card-text>
      <slot name="card-text" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    titleCenter: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const titleModifier = computed(() => ({
      'justify-center': props.titleCenter,
    }))

    return {
      titleModifier,
    }
  },
})
</script>
