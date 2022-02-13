<template>
  <v-app>
    <Header
      @rightMenuClick="rightDrawer = !rightDrawer"
      @minusClick="fixed = !fixed"
    />
    <v-main>
      <v-container class="fill-height">
        <RouterView />
      </v-container>
    </v-main>
    <Sidebar :right="right" :right-drawer="rightDrawer" />
    <Footer :fixed="fixed" />
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import layout from '@/mixins/layout'

export default Vue.extend({
  name: 'GuestLayout',
  mixins: [layout],
  async mounted() {
    this.$store.dispatch('theme/init')
    this.$vuetify.theme.dark = this.$store.getters['theme/currentDarkMode']
    await this.$store.dispatch('admin/currentAdmin')
  },
})
</script>
