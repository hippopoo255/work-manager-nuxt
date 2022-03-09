<template>
  <Loader v-if="loading" />
  <ul v-else class="u-list --space-2">
    <li
      v-for="(activity, index) in activities"
      :key="index"
      class="u-list__item"
    >
      <ActivityBar :activity="activity" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Activity } from '@/types/ts-axios'

export default defineComponent({
  props: {
    activities: {
      type: Array as PropType<Activity[]>,
      required: true,
    },
    loading: { type: Boolean as PropType<boolean>, default: false },
  },
  setup() {},
})
</script>
