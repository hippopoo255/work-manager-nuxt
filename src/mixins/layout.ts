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
  async created() {
    await this.$store.dispatch('admin/currentAdmin').then((admin) => {
      if (admin && this.isTopPage(String(this.$route.name))) {
        this.$router.push(this.localePath('dashboard'))
      } else if (!admin && this.isTopPage(String(this.$route.name))) {
        this.$router.push(this.localePath('signin'))
      } else if (admin && this.isDenyAuthorRoute(String(this.$route.name))) {
        this.$router.push(this.localePath('dashboard'))
      } else if (
        !(admin || this.isAcceptGuestRoute(String(this.$route.name)))
      ) {
        this.$router.push(this.localePath('signin'))
      }
    })
  },
  methods: {
    toggleTheme(isDarkMode: boolean) {
      this.$vuetify.theme.dark = isDarkMode
    },
    isTopPage(currentPathName: string) {
      return currentPathName === this.localeLocation('index')?.name
    },
    isDenyAuthorRoute(currentPathName: string) {
      return [
        // this.localeLocation('index')?.name,
        this.localeLocation('account_setup')?.name,
        this.localeLocation('account_verification')?.name,
        this.localeLocation('password-forgot')?.name,
        this.localeLocation('password-reset')?.name,
        this.localeLocation('signin')?.name,
      ].includes(currentPathName)
    },
    isAcceptGuestRoute(currentPathName: string) {
      return [
        // もしFAQなど未認証OKのページをを作ったらここに追加
        this.localeLocation('account_setup')?.name,
        this.localeLocation('account_verification')?.name,
        this.localeLocation('password-forgot')?.name,
        this.localeLocation('password-reset')?.name,
        this.localeLocation('signin')?.name,
      ].includes(currentPathName)
    },
  },
})
