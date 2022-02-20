import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  data: () => ({
    fixed: false,
    drawer: false,
    miniVariant: false,
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
      admin: 'admin/currentAdmin',
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
  async mounted() {
    this.$store.dispatch('theme/init')
    this.$vuetify.theme.dark = await this.$store.getters[
      'theme/currentDarkMode'
    ]
  },
  async beforeCreate() {
    await this.$store.dispatch('admin/currentAdmin').then((admin) => {
      if (!admin) {
        this.$router.push(this.localePath('signin'))
      } else if (this.$route.name === this.localeLocation('index')?.name) {
        this.$router.push(this.localePath('dashboard'))
      }
    })
  },
  methods: {
    toggleTheme(isDarkMode: boolean) {
      this.$vuetify.theme.dark = isDarkMode
    },
  },
})
