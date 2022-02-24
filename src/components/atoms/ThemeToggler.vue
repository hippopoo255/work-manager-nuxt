<template>
  <v-switch v-model="toggler" :label="darkStatus" @change="handleChange">
  </v-switch>
</template>
<script lang="ts">
import {
  computed,
  useContext,
  defineComponent,
  ref,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_props) {
    const { i18n, store } = useContext()
    const currentDarkMode = computed(
      () => store.getters['theme/currentDarkMode']
    )
    const toggler = ref(store.getters['theme/currentDarkMode'])
    watch(
      () => currentDarkMode.value,
      (val) => (toggler.value = val),
      { immediate: true }
    )
    const darkStatus = computed(() => i18n.t('submit.theme'))
    const handleChange = () => {
      toggleTheme()
    }
    const toggleTheme = () => {
      store.dispatch('theme/toggleDarkMode', !currentDarkMode.value)
    }
    return {
      currentDarkMode,
      darkStatus,
      handleChange,
      toggleTheme,
      toggler,
    }
  },
})
</script>
