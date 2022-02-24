<template>
  <v-select
    :value="current"
    :items="items"
    :label="$t('app.locale')"
    item-text="name"
    item-value="code"
    @change="changeLocale"
  ></v-select>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { i18n } = useContext()

    const changeLocale = (e: string) => {
      i18n.setLocale(e)
      i18n.setLocaleCookie(e)
    }
    const items = ref(i18n.locales)
    const current = ref(i18n.localeProperties)

    return {
      changeLocale,
      current,
      items,
    }
  },
})
</script>
