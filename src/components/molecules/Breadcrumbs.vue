<template>
  <v-breadcrumbs :items="breadcrumbs" class="px-0">
    <template #item="{ item }">
      <li>
        <nuxt-link
          :to="item.to"
          :disabled="item.disabled"
          exact
          exact-active-class="--active"
          class="breadcrumb__item"
        >
          {{ item.text }}
        </nuxt-link>
      </li>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { breadcrumbData } from '@/config'

export default defineComponent({
  name: 'Breadcrumbs',
  setup() {
    const { i18n, app } = useContext()
    const route = useRoute()

    const getPathWithoutLocaleSuffix = () => {
      const locale = i18n.locale
      const routeName = route.value.name
      return routeName ? routeName.replace(`___${locale}`, '') : ''
    }

    const breadcrumbs = computed(() => {
      const params = route.value.params
      const pathname = getPathWithoutLocaleSuffix()
      const list = breadcrumbData(i18n, app.localePath, params)
      const items = list[pathname]
      if (pathname !== 'dashboard') {
        items.unshift({
          text: i18n.t('breadcrumb.dashboard'),
          disabled: false,
          to: app.localePath('dashboard'),
        })
      }
      return items
    })

    return {
      breadcrumbs,
    }
  },
})
</script>
<style lang="scss">
.breadcrumb__item {
  font-size: 14px;
  &.--active {
    pointer-events: none;
    color: grey;
  }
}
</style>
