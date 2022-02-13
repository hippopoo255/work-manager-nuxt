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
import layout from '@/mixins/layout'
export default Vue.extend({
  name: 'DefaultLayout',
  // middleware: 'authentication',
  mixins: [layout],
  async mounted() {
    this.$store.dispatch('theme/init')
    this.$vuetify.theme.dark = this.$store.getters['theme/currentDarkMode']
    const admin = await this.$store.dispatch('admin/currentAdmin')
    if (admin === '') {
      this.$router.push(this.localePath('signin'))
    }
  },
})
</script>
