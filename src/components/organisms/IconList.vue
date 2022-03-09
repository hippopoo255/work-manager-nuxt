<template>
  <div>
    <ul class="p-icon-list">
      <li v-for="(item, i) in iconList" :key="i" class="p-icon-list__item">
        <IconPanel :icon-item="item" :link="link" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IconItem } from '@/mock'

export default defineComponent({
  props: {
    iconList: { type: Array as PropType<IconItem[]>, default: () => [] },
    link: { type: Boolean as PropType<boolean>, default: false },
  },
  setup() {},
})
</script>
