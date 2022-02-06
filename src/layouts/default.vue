<template>
  <v-app>
    <Header
      @rightMenuClick="rightDrawer = !rightDrawer"
      @minusClick="fixed = !fixed"
    />
    <v-main>
      <v-container>
        <RouterView />
        <!-- <Nuxt /> -->
      </v-container>
    </v-main>
    <Sidebar :right="right" :right-drawer="rightDrawer" />
    <Footer :fixed="fixed" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'DefaultLayout',
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
  mounted() {
    this.$store.dispatch('theme/init')
    this.$vuetify.theme.dark = this.$store.getters['theme/currentDarkMode']
  },
  methods: {
    toggleTheme(isDarkMode: boolean) {
      this.$vuetify.theme.dark = isDarkMode
    },
  },
})
</script>
