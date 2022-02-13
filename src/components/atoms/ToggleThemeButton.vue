<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click.stop="toggleTheme">
        <v-icon>{{ iconName }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { computed, useContext, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_props) {
    const { i18n, store } = useContext()
    const currentDarkMode = computed(
      () => store.getters['theme/currentDarkMode']
    )
    const iconName = computed(() =>
      currentDarkMode.value ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
    )
    const tooltipText = computed(() =>
      currentDarkMode.value
        ? i18n.t('tooltip.theme.toLight')
        : i18n.t('tooltip.theme.toDark')
    )
    const toggleTheme = () => {
      store.dispatch('theme/toggleDarkMode', !currentDarkMode.value)
    }
    return {
      currentDarkMode,
      iconName,
      toggleTheme,
      tooltipText,
    }
  },
})
</script>
