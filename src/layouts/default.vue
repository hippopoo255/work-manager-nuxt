<template>
  <v-app>
    <Header
      :mini-variant="miniVariant"
      @menuClick="drawer = !drawer"
      @minusClick="fixed = !fixed"
      @onMiniVariant="miniVariant = !miniVariant"
    />
    <v-main>
      <!-- <p style="max-width: 1000px; margin: 0 auto">こんばんは</p> -->
      <!-- TODO: パンくずリスト -->
      <v-container>
        <RouterView />
        <!-- <Nuxt /> -->
      </v-container>
    </v-main>
    <Sidebar :d="drawer" :mini-variant="miniVariant" />
    <Footer :fixed="fixed" />
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import layout from '@/mixins/layout'
export default Vue.extend({
  name: 'DefaultLayout',
  // middleware: 'authentication',
  mixins: [layout],
  // async mounted() {
  //   if (!this.$store.getters['admin/currentAdmin']) {
  //     await this.$router.push(this.localePath('signin'))
  //   }
  // },
})
</script>
