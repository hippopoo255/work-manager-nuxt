<template>
  <v-card class="p-dashboard-card" :class="{ '--scroll': scroll }">
    <v-card-title class="p-dashboard-card__title px-0" :class="titleClass">
      <v-icon
        color="inherit"
        class="p-dashboard-card__title-icon"
        :class="modifierByResource"
        >{{ title.icon }}</v-icon
      >
      <span class="p-dashboard-card__title-text"> {{ title.text }} </span>
    </v-card-title>
    <!-- <v-divider></v-divider> -->
    <v-card-text class="p-dashboard-card__text">
      <slot name="card-content" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
type CardTitle = {
  icon: string
  text: string
}

export default defineComponent({
  props: {
    title: {
      type: Object as PropType<CardTitle>,
      default: () => ({
        icon: 'mdi-post-outline',
        text: 'ブログ',
      }),
    },
    resource: {
      type: String as PropType<string>,
      default: 'blog',
    },
    scroll: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    noTitleSpace: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const titleClass = computed(() => ({
      [`--${props.resource}`]: true,
      '--no-space': props.noTitleSpace,
    }))
    const modifierByResource = computed(() => [`--${props.resource}`])
    return {
      modifierByResource,
      titleClass,
    }
  },
})
</script>
