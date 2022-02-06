import { NuxtI18nInstance } from 'nuxt-i18n'
import { Framework } from 'vuetify'

declare module '@nuxt/types' {
  interface Context {
    i18n: NuxtI18nInstance
    $vuetify: Framework
  }
}

export {}
// window.onNuxtReady
declare global {
  interface Window {
    onNuxtReady(cb: () => void): void
  }
}
