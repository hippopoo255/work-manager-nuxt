<template>
  <div class="p-activity-bar --line" :class="modifierByActivityKey">
    <div class="p-activity-bar__inner">
      <div class="p-activity-bar__head">
        <span class="p-activity-bar__date">{{
          postTiming(new Date(activity.created_at))
        }}</span>
        <span class="p-activity-bar__title">{{ title }}</span>
      </div>
      <div class="p-activity-bar__main">
        <nuxt-link v-if="isAdminPage" :to="to">{{ content }}</nuxt-link>
        <span v-else>{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { Activity } from '~/types/ts-axios'
import { postTiming } from '@/lib/util'

export default defineComponent({
  props: {
    activity: { type: Object as PropType<Activity>, required: true },
  },
  setup(props) {
    const { app } = useContext()
    const title = computed(() => {
      const regex = new RegExp(
        `^${props.activity.created_by.full_name}さん(が|から)(.+)「.+」([を|が].+)`
      )
      const what = props.activity.content.match(/「.+」/g)
      if (what) {
        let title = props.activity.content.replace(regex, '$2$3')
        title = title.replace('にを', 'を')
        if (!isAdminPage.value) {
          title = replaceIfUserAction(title)
        }
        return title
      } else {
        return ''
      }
    })

    const content = computed(() => {
      const what = props.activity.content.match(/「(.+)」/g)
      if (what) {
        const c = what[0].replace(/「(.+)」/g, '$1')
        return c
      } else {
        return ''
      }
    })
    const modifierByActivityKey = computed(() => [
      `--${props.activity.action_type.key}`,
    ])

    const to = computed(() => app.localePath(props.activity.action_type.link))
    const replaceIfUserAction = (title: string) =>
      title.replace(/(.+)が(.+)されました/g, '$1を$2しました')

    const isAdminPage = computed(() => {
      const isMypage = props.activity.action_type.link.match(/^\/mypage.+$/g)
      return isMypage === null
    })
    return {
      modifierByActivityKey,
      title,
      content,
      postTiming,
      isAdminPage,
      to,
    }
  },
})
</script>
