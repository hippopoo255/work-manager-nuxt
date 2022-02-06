<template>
  <v-footer :absolute="!fixed" app>
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    fixed: { type: Boolean, default: false },
  },
  setup(_props) {},
})
</script>
