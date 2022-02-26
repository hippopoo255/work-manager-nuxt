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
export default defineComponent({
  name: 'Breadcrumbs',
  setup() {
    const { i18n, app } = useContext()
    const route = useRoute()

    const getParamsAndKeys = (): [{ [key: string]: string }, string[]] => {
      const params = route.value.params
      const paramKeys = Object.keys(params)
      return [params, paramKeys]
    }

    const getPathWithoutLocaleSuffix = () => {
      const locale = i18n.locale
      const routeName = route.value.name
      return routeName ? routeName.replace(`___${locale}`, '') : ''
    }

    const getPathsPerSlash = () => {
      const currentPathWithoutLocale = getPathWithoutLocaleSuffix()
      return currentPathWithoutLocale.split('-')
    }

    const breadcrumbs = computed(() => {
      const [params, paramKeys] = getParamsAndKeys()
      const pathsPerSlash = getPathsPerSlash()
      let name = ''
      const items = [
        {
          text: i18n.t('breadcrumb.dashboard'),
          disabled: false,
          to: app.localePath('dashboard'),
        },
      ]
      pathsPerSlash.forEach((stair, i) => {
        const i18nArg = paramKeys.includes(stair) ? params[stair] : ''
        name += i === 0 ? stair : `-${stair}`
        if (name === 'dashboard') {
          items[0].disabled = true
          return true
        }
        const toDots = name.replace(/-/g, '.')
        let pageTitle: any = i18n.t(`breadcrumb.${toDots}`, {
          [stair]: i18nArg,
        })
        if (typeof pageTitle !== 'string') {
          pageTitle = i18n.t(`breadcrumb.${toDots}.index`, {
            [stair]: i18nArg,
          })
        }
        const item = {
          text: String(pageTitle),
          disabled: i === pathsPerSlash.length - 1,
          to: app.localePath({
            name,
            params: {
              [stair]: i18nArg,
            },
          }),
        }
        items.push(item)
      })
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
