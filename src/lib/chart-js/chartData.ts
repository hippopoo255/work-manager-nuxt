import { NuxtI18nInstance } from 'nuxt-i18n'
import * as types from './type'
import { requestUri } from '~/config'

export const dataCategories: (
  i18n: NuxtI18nInstance
) => types.DataCategories = (i18n: NuxtI18nInstance) => ({
  blog: [
    {
      label: String(i18n.t('chart.label.blog')),
      name: 'report',
    },
    {
      label: String(i18n.t('chart.label.blogPerPost')),
      name: 'posts',
    },
  ],
  blogPerUser: [
    {
      label: String(i18n.t('chart.label.chatPerPost')),
      name: 'report',
    },
    {
      label: String(i18n.t('chart.label.chatPerUser')),
      name: 'like',
    },
  ],
  chat: [
    {
      label: String(i18n.t('chart.label.chat')),
      name: 'report',
    },
  ],
  chatPerPost: [
    {
      label: String(i18n.t('chart.label.chatPerPost')),
      name: 'report',
    },
  ],
  chatPerUser: [
    {
      label: String(i18n.t('chart.label.chatPerUser')),
      name: 'report',
    },
  ],
  minutes: [
    {
      label: String(i18n.t('chart.label.minutes')),
      name: 'minutes',
    },
  ],
})

export const path: types.ChartApiPaths = {
  blog: requestUri.blog.chart,
  blogPerUser: requestUri.blog.chart + '?group=user',
  chat: requestUri.chat.chart,
  chatPerPost: requestUri.chat.chart + '?group=post',
  chatPerUser: requestUri.chat.chart + '?group=user',
  minutes: requestUri.minutes.chart,
}
