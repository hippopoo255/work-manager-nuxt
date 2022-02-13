<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isSignin" @click="signout">
          <v-list-item-action>
            <v-icon>mdi-exit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('submit.signout')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="primary" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$emit('minusClick')">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="$emit('rightMenuClick')">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <ToggleThemeButton />
      <ToggleLocaleButton />
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import {
  computed,
  ref,
  useContext,
  useRouter,
  defineComponent,
} from '@nuxtjs/composition-api'
import { menus } from '@/config/sidebar'

export default defineComponent({
  setup() {
    const { app, i18n, store } = useContext()
    const router = useRouter()

    const clipped = ref(false)
    const drawer = ref(false)
    const fixed = ref(false)
    const items = computed(() => menus(i18n))
    const miniVariant = ref(false)
    const rightDrawer = ref(false)
    const title = computed(() => i18n.t('app.name'))

    const isSignin = computed(() => store.getters['admin/isSignin'])
    const signout = async () => {
      const responseMsg = await store.dispatch('admin/signout')
      if (responseMsg === 'SUCCESS') {
        router.push(app.localePath('signin'))
      }
    }

    return {
      clipped,
      drawer,
      fixed,
      isSignin,
      items,
      miniVariant,
      rightDrawer,
      signout,
      title,
    }
  },
})
</script>
