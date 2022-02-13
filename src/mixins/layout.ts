import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  data: () => ({
    fixed: false,
    right: true,
    rightDrawer: false,
  }),
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      htmlAttrs: {
        // My HtmlAttrs
        ...i18nSeo.htmlAttrs,
      },
      meta: [
        // My Metas
        ...i18nSeo.meta,
      ],
      link: [
        // My Links
        ...i18nSeo.link,
      ],
    }
  },
  computed: {
    ...mapGetters({
      darkMode: 'theme/currentDarkMode',
    }),
  },
  watch: {
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    darkMode: {
      handler(newValue) {
        this.toggleTheme(!!newValue)
      },
      immediate: true,
    },
  },
  methods: {
    toggleTheme(isDarkMode: boolean) {
      this.$vuetify.theme.dark = isDarkMode
    },
  },
})
