<template>
  <v-card>
    <TabList :tabs="tabs" :tab-click="handleSwitch" />
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
  // computed,
  defineComponent,
  useContext,
  ref,
} from '@nuxtjs/composition-api'
import { tabList, switchTab } from '@/config'
export default defineComponent({
  name: 'Settingform',
  setup() {
    const { i18n } = useContext()

    const tabs = tabList.setting(i18n)

    const currentTabId = ref(1)

    const handleSwitch = (id?: number) => {
      switchTab(currentTabId, id)
    }
    return {
      currentTabId,
      handleSwitch,
      tabs,
    }
  },
})
</script>
