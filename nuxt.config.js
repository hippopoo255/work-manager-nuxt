import colors from 'vuetify/es5/util/colors'
import locales from './src/locales'
require('dotenv').config()

export default {
  /// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,
  // src directory
  srcDir: 'src/',

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'forbidden',
        path: '/forbidden',
        component: resolve(__dirname, 'src/pages/error/403.vue'),
      })
      routes.push({
        name: 'not-found',
        path: '/not-found',
        component: resolve(__dirname, 'src/pages/error/404.vue'),
      })
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ジョブサポ管理画面',
    title: 'ジョブサポ管理画面',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
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
  // @nuxt/image options: https://image.nuxtjs.org/api/options/
  image: {},

  env: {
    APP_NAME_EN: process.env.APP_NAME_EN,
    APP_NAME_JA: process.env.APP_NAME_JA,
    API_STAGE_URL: process.env.API_STAGE_URL,
    API_DIRECT_URL: process.env.API_DIRECT_URL,
    APP_STORAGE_URL: process.env.APP_STORAGE_URL,
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_COGNITO_IDENTITY_POOL_ID: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
    AWS_COGNITO_TEST_ADMIN_NAME: process.env.AWS_COGNITO_TEST_ADMIN_NAME,
    AWS_COGNITO_TEST_ADMIN_EMAIL: process.env.AWS_COGNITO_TEST_ADMIN_EMAIL,
    AWS_COGNITO_TEST_ADMIN_PASSWORD:
      process.env.AWS_COGNITO_TEST_ADMIN_PASSWORD,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/custom', ssr: false },
    { src: '~/plugins/formLength' },
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
      families: ['Noto+Sans+JP:200,500,700', 'Roboto'],
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
    customVariables: ['~/assets/scss/Foundation/variable.scss'],
    options: { customProperties: true },
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: '#3DA6FF',
          accent: colors.grey.lighten2,
          secondary: '#F5AB00',
          info: colors.teal.lighten2,
          warning: colors.amber.base,
          error: '#EB5443',
          success: colors.green,
        },
        light: {
          primary: '#3DA6FF',
          accent: colors.grey.lighten2,
          secondary: '#F5AB00',
          info: colors.teal.lighten2,
          warning: colors.amber.accent3,
          error: '#EB5443',
          success: colors.green,
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
