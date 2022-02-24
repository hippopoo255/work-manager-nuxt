<template>
  <v-card>
    <TabList :tabs="tabs" :tab-click="switchTab" />
    <!-- 一般 -->
    <CommonSettingForm v-if="currentTabId === 1" />
    <!-- 通知 -->
    <!-- <NotificationForm v-if="currentTabId === 2" /> -->
    <!-- パスワード変更 -->
    <ResetPasswordForm v-if="currentTabId === 3" />
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Settingform',
  setup() {
    const { i18n } = useContext()

    const tabs = computed(() => [
      {
        id: 1,
        text: i18n.t('tab.setting.common'),
      },
      // {
      //   id: 2,
      //   text: i18n.t('tab.setting.notification'),
      // },
      {
        id: 3,
        text: i18n.t('tab.setting.changePassword'),
      },
    ])

    const currentTabId = ref(1)

    const switchTab = (id?: number) => {
      if (id) {
        currentTabId.value = id
      }
    }

    return {
      currentTabId,
      switchTab,
      tabs,
    }
  },
})
</script>
