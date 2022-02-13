import { NuxtI18nInstance } from 'nuxt-i18n'

export const menus = (i18n: NuxtI18nInstance) => [
  {
    icon: 'mdi-apps',
    title: i18n.t('layout.sidebar.home'),
    to: 'index',
  },
  {
    icon: 'mdi-chart-bubble',
    title: i18n.t('layout.sidebar.signin'),
    to: 'signin',
  },
  {
    icon: 'mdi-chart-bubble',
    title: i18n.t('layout.sidebar.signup'),
    to: 'signup',
  },
  {
    icon: 'mdi-chart-bubble',
    title: i18n.t('layout.sidebar.password-forgot'),
    to: 'password-forgot',
  },
  {
    icon: 'mdi-chart-bubble',
    title: i18n.t('layout.sidebar.password-reset'),
    to: 'password-reset',
  },
]

export const menus2 = [
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
