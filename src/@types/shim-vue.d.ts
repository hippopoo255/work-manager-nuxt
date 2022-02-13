import { Framework } from 'vuetify'

declare module '@nuxt/types' {
  interface Context {
    $vuetify: Framework
    SAMPLE: string
  }
}

export {}
// window.onNuxtReady
declare global {
  interface Window {
    onNuxtReady(cb: () => void): void
  }
}
