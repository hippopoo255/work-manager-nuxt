<template>
  <div class="c-icon-panel">
    <nuxt-link
      :to="localePath(iconItem.to)"
      class="c-icon-panel__link"
      :class="disableLink"
    >
      <div class="c-icon-panel__inner">
        <v-icon class="c-icon-panel__icon" :class="modifierByResource">{{
          iconItem.icon
        }}</v-icon>
        <span class="c-icon-panel__name">{{ iconItem.name }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { IconItem } from '@/mock'

export default defineComponent({
  props: {
    iconItem: {
      type: Object as PropType<IconItem>,
      default: () => ({
        name: 'チャット',
        icon: 'mdi-chat-outline',
        resource: 'chat',
        to: 'chat',
      }),
    },
    link: { type: Boolean as PropType<boolean>, default: false },
  },
  setup(props) {
    const modifierByResource = computed(() => [`--${props.iconItem.resource}`])
    const disableLink = computed(() => ({
      '--disable-link': !props.link,
    }))
    return {
      disableLink,
      modifierByResource,
    }
  },
})
</script>
