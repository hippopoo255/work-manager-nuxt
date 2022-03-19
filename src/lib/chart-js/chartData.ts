import * as types from './type'
import { requestUri } from '~/config'

export const dataCategories: types.DataCategories = {
  blog: [
    {
      label: '報告件数',
      name: 'report',
    },
    {
      label: '投稿件数',
      name: 'posts',
    },
  ],
  blogPerUser: [
    {
      label: '報告された件数',
      name: 'report',
    },
    {
      label: '投稿件数',
      name: 'like',
    },
  ],
  chat: [
    {
      label: '報告件数',
      name: 'report',
    },
  ],
  chatPerPost: [
    {
      label: '報告された件数',
      name: 'report',
    },
  ],
  chatPerUser: [
    {
      label: '報告された件数',
      name: 'report',
    },
  ],
  minutes: [
    {
      label: '作成件数',
      name: 'minutes',
    },
  ],
}

export const path: types.ChartApiPaths = {
  blog: requestUri.blog.chart,
  blogPerUser: requestUri.blog.chart + '?group=user',
  chat: requestUri.chat.chart,
  chatPerPost: requestUri.chat.chart + '?group=post',
  chatPerUser: requestUri.chat.chart + '?group=user',
  minutes: requestUri.minutes.chart,
}
