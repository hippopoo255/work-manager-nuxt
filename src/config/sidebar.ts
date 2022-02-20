import { NuxtI18nInstance } from 'nuxt-i18n'

export const menus = (i18n: NuxtI18nInstance) => [
  {
    icon: 'mdi-apps',
    title: i18n.t('layout.sidebar.dashboard'),
    to: 'dashboard',
  },
  {
    icon: 'mdi-account-multiple-outline',
    title: i18n.t('layout.sidebar.user.top'),
    children: [
      {
        icon: 'mdi-format-list-bulleted',
        title: i18n.t('layout.sidebar.user.index'),
        to: 'user',
      },
      {
        icon: 'mdi-plus-circle-outline',
        title: i18n.t('layout.sidebar.user.create'),
        to: 'user-create',
      },
    ],
  },
  {
    icon: 'mdi-account-lock-outline',
    title: i18n.t('layout.sidebar.admin.top'),
    children: [
      {
        icon: 'mdi-format-list-bulleted',
        title: i18n.t('layout.sidebar.admin.index'),
        to: 'admin',
      },
      {
        icon: 'mdi-plus-circle-outline',
        title: i18n.t('layout.sidebar.admin.create'),
        to: 'admin-create',
      },
    ],
  },
  {
    icon: 'mdi-post-outline',
    title: i18n.t('layout.sidebar.blog.top'),
    children: [
      {
        icon: 'mdi-format-list-bulleted',
        title: i18n.t('layout.sidebar.blog.index'),
        to: 'blog',
      },
      {
        icon: 'mdi-alert',
        title: i18n.t('layout.sidebar.blog.report'),
        to: 'blog-report',
      },
    ],
  },
  {
    icon: 'mdi-chat-outline',
    title: i18n.t('layout.sidebar.chat.top'),
    children: [
      {
        icon: 'mdi-alert',
        title: i18n.t('layout.sidebar.chat.report'),
        to: 'chat-report',
      },
    ],
  },
  {
    icon: 'mdi-cog-outline',
    title: i18n.t('layout.sidebar.setting.top'),
    children: [
      {
        icon: 'mdi-cog-outline',
        title: i18n.t('layout.sidebar.setting.index'),
        to: 'setting',
      },
      {
        icon: 'mdi-domain',
        title: i18n.t('layout.sidebar.setting.organization'),
        to: 'organization',
      },
      {
        title: i18n.t('layout.sidebar.setting.master'),
        to: 'master',
      },
    ],
  },
]

export const authIconMenu = [
  // プロフィール, サインアウト
  {
    icon: 'mdi-apps',
    title: 'Welcome',
    to: '',
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'Signin',
    to: 'signin',
  },
  {
    icon: 'mdi-chart-bubble',
    title: '新規登録',
    to: 'password-reset',
  },
]
