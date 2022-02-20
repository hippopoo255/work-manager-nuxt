<template>
  <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
    <v-list>
      <div v-for="(item, index) in menuList" :key="`menu_${index}`">
        <v-list-item
          v-if="isSingle(item)"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <!-- 子メニューがある場合 -->
        <v-list-group v-else :value="index === 1" :prepend-icon="item.icon">
          <template #activator>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <!-- <v-list-item-content>
            </v-list-item-content> -->
          </template>

          <v-list-item
            v-for="(child, i) in item.children"
            :key="`child_${i}`"
            route
            exact
            dense
            :to="localePath(child.to)"
          >
            <v-list-item-icon>
              <v-icon small>{{ child.icon || 'mdi-pencil-outline' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ child.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  watch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { menus } from '@/config'

type SidebarItem = {
  icon?: string
  title: string
  to?: string
  children?: SidebarItem[]
}

export default defineComponent({
  props: {
    d: { type: Boolean, default: false },
    miniVariant: { type: Boolean, default: false },
  },
  setup(props) {
    watch(
      () => props.d,
      () => {
        drawer.value = true
      }
    )
    const { i18n } = useContext()
    const drawer = ref(false)
    const menuList = computed(() => menus(i18n))
    const setDrawer = () => {
      drawer.value = !drawer.value
    }
    const isSingle = (item: SidebarItem) => {
      return !item.children
    }
    return {
      drawer,
      setDrawer,
      menuList,
      isSingle,
    }
  },
})
</script>
