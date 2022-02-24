<template>
  <v-app>
    <Header
      :mini-variant="miniVariant"
      @menuClick="drawer = !drawer"
      @minusClick="fixed = !fixed"
      @onMiniVariant="miniVariant = !miniVariant"
    />
    <v-main>
      <v-container class="fill-height">
        <RouterView />
      </v-container>
    </v-main>
    <!-- <Sidebar :d="drawer" :mini-variant="miniVariant" /> -->
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
})
</script>
