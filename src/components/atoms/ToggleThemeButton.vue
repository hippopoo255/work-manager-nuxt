<template>
  <v-btn icon @click.stop="toggleTheme">
    <v-icon>mdi-antenna</v-icon>
  </v-btn>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_props, { root }: SetupContext) {
    const store = root.$store
    const currentDarkMode = computed(
      () => store.getters['theme/currentDarkMode']
    )
    const toggleTheme = () => {
      store.dispatch('theme/toggleDarkMode', !currentDarkMode.value)
    }
    return {
      toggleTheme,
      currentDarkMode,
    }
  },
})
</script>
