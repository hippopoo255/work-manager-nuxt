<template>
  <ul class="p-activity-rows">
    <li
      v-for="(activity, index) in activities"
      :key="index"
      class="p-activity-rows__row"
    >
      <div class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-avatar
            :color="handleIconColor(activity.action_type.is_admin)"
            size="20"
            class="mr-1"
          >
            <v-icon color="white" small>mdi-account</v-icon>
          </v-avatar>
          <nuxt-link
            :to="
              localePath(
                `/${authenticatableName(activity.action_type.is_admin)}/${
                  activity.created_by.id
                }`
              )
            "
            class="u-text-xs"
            >{{ activity.created_by.full_name }}</nuxt-link
          >
        </div>
        <div>
          <span class="date">{{
            postTiming(new Date(activity.created_at))
          }}</span>
        </div>
      </div>
      <div class="p-activity-rows__body">{{ activity.content }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Activity } from '~/types/ts-axios'
import { postTiming } from '@/lib/util'
export default defineComponent({
  props: {
    activities: {
      type: Array as PropType<Activity[]>,
      default: () => [],
    },
  },
  setup() {
    const handleIconColor = (isAdmin: number) => (isAdmin ? 'info' : 'orange')
    const authenticatableName = (isAdmin: number) =>
      isAdmin ? 'admin' : 'user'
    return {
      postTiming,
      handleIconColor,
      authenticatableName,
    }
  },
})
</script>
