import { NuxtI18nInstance } from 'nuxt-i18n'
import { Ref } from '@nuxtjs/composition-api'

export const tabList = {
  setting: (i18n: NuxtI18nInstance) => [
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
  ],
  userDetail: (i18n: NuxtI18nInstance) => [
    {
      id: 1,
      text: i18n.t('tab.userDetail.score'),
    },
    {
      id: 2,
      text: i18n.t('tab.userDetail.base'),
    },
    {
      id: 3,
      text: i18n.t('tab.userDetail.activity'),
    },
  ],
  adminDetail: (i18n: NuxtI18nInstance) => [
    {
      id: 1,
      text: i18n.t('tab.adminDetail.base'),
    },
    {
      id: 2,
      text: i18n.t('tab.adminDetail.activity'),
    },
  ],
}

export const switchTab = (currentTabId: Ref<number>, id?: number) => {
  if (id) {
    currentTabId.value = id
  }
}
