<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline"> {{ $t('app.name') }} </v-card-title>
        <v-card-text>
          <p>
            {{ indexMessage }}
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/"> Continue </v-btn>
          <v-spacer />
          <v-btn color="info" @click="changeLocale">
            {{ nextLocaleText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRoute,
  computed,
  watch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { i18n, $vuetify } = useContext()
    const indexMessage = i18n.t('page.index.message')
    const route = useRoute()
    watch(
      () => route,
      () => {
        $vuetify.theme.dark = true
      },
      { immediate: true }
    )
    const changeLocale = () => {
      const locale = i18n.locale === 'ja' ? 'en' : 'ja'
      i18n.setLocale(locale)
      i18n.setLocaleCookie(locale)
    }
    const nextLocaleText = computed(() => (i18n.locale === 'ja' ? 'en' : 'ja'))

    return {
      changeLocale,
      indexMessage,
      nextLocaleText,
    }
  },
})
</script>
