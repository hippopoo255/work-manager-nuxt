<template>
  <v-app-bar :clipped-left="clipped" color="primary" fixed app>
    <v-container class="d-flex align-center">
      <!-- <v-btn icon @click.stop="$emit('menuClick')" class="d-block d-lg-none"> -->

      <v-btn v-if="isSignin" icon @click.stop="$emit('menuClick')">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn
        icon
        class="d-none d-lg-block"
        @click.stop="$emit('onMiniVariant')"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <ToggleThemeButton /> -->
      <!-- <ToggleLocaleButton /> -->
      <AuthMenuAvatar v-if="isSignin" :admin="admin" class="ml-4" />
    </v-container>
  </v-app-bar>
</template>
<script lang="ts">
import {
  computed,
  ref,
  useContext,
  defineComponent,
} from '@nuxtjs/composition-api'
import { menus } from '@/config/sidebar'
// import { Breakpoint } from 'vuetify/types/services/breakpoint'

export default defineComponent({
  props: {
    miniVariant: { type: Boolean, default: false },
  },
  setup() {
    const { i18n, store } = useContext()
    const clipped = ref(false)
    const fixed = ref(false)
    const items = computed(() => menus(i18n))
    const title = computed(() => admin.value.organization_name || '')
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const admin = computed(() => store.getters['admin/currentAdmin'])

    return {
      clipped,
      fixed,
      isSignin,
      items,
      title,
      admin,
    }
  },
})
</script>
