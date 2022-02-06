import colors from 'vuetify/es5/util/colors'
import locales from './src/locales'
require('dotenv').config()

export default {
  /// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,
  // src directory
  srcDir: 'src/',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ジョブサポ管理画面',
    title: 'ジョブサポ管理画面',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '~/assets/scss/app.scss',
      lang: 'scss',
    },
  ],

  env: {
    APP_NAME_EN: process.env.APP_NAME_EN,
    APP_NAME_JA: process.env.APP_NAME_JA,
    API_URL: process.env.API_URL,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    /* '~/plugins/vuetify' */
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/atoms', extensions: ['vue'] },
    { path: '~/components/molecules', extensions: ['vue'] },
    { path: '~/components/organisms', extensions: ['vue'] },
    { path: '~/components/templates', extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    ['nuxt-i18n', locales],
  ],

  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:400,500,700'],
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL || 'http://localhost:8080',
    credentials: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: false,
    },
    customVariables: ['~/assets/scss/Foundation/variables.scss'],
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  // styleResources: {
  //   scss: ['~/assets/scss/Foundation/variables.scss'],
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
        sassOptions: {
          fiber: false,
        },
      },
    },
  },
}
