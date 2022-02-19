<template>
  <v-btn color="accent" @click="changeLocale">
    {{ nextLocaleText }}
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { i18n } = useContext()
    const changeLocale = () => {
      const locale = i18n.locale === 'ja' ? 'en' : 'ja'
      i18n.setLocale(locale)
      i18n.setLocaleCookie(locale)
    }
    const nextLocaleText = computed(() => (i18n.locale === 'ja' ? 'en' : 'ja'))
    return {
      changeLocale,
      nextLocaleText,
    }
  },
})
</script>
