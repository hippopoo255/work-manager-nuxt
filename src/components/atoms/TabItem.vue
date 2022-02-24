<template>
  <v-tab @click="$emit('click', tab.id)">{{ tab.text }}</v-tab>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
type TabItem = {
  id?: number
  text: string
}

export default defineComponent({
  name: 'TabItem',
  props: {
    tab: { type: Object as PropType<TabItem>, required: true },
  },
  setup() {},
})
</script>
