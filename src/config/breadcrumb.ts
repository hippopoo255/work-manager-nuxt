import { NuxtI18nInstance } from 'nuxt-i18n'
import Vue from 'vue'

export const breadcrumb = (
  i18n: NuxtI18nInstance,
  localePath: Vue['localePath'],
  params: { [k: string]: string }
) => ({
  dashboard: [],
  user: [
    {
      text: i18n.t('breadcrumb.user.index'),
      // disabled: true,
      to: localePath('dashboard'),
    },
  ],
  admin: [
    {
      text: i18n.t('breadcrumb.admin.index'),
      // disabled: true,
      to: localePath('dashboard'),
    },
  ],
  'user-id': [
    {
      text: i18n.t('breadcrumb.user.index'),
      // disabled: true,
      to: localePath('user'),
    },
    {
      text: i18n.t('breadcrumb.user.id', {
        id: params.id,
      }),
      // disabled: true,
      to: localePath('user-id'),
    },
  ],
  'admin-id': [
    {
      text: i18n.t('breadcrumb.admin.index'),
      // disabled: true,
      to: localePath('admin'),
    },
    {
      text: i18n.t('breadcrumb.admin.id', {
        id: params.id,
      }),
      // disabled: true,
      to: localePath('admin-id'),
    },
  ],
  'blog-report': [
    {
      text: i18n.t('breadcrumb.blog.report'),
      // disabled: true,
      to: localePath('blog-report'),
    },
  ],
  'chat-report': [
    {
      text: i18n.t('breadcrumb.chat.report'),
      // disabled: true,
      to: localePath('chat-report'),
    },
  ],
  setting: [
    {
      text: i18n.t('breadcrumb.setting.index'),
      // disabled: true,
      to: localePath('setting'),
    },
  ],
  profile: [
    {
      text: i18n.t('breadcrumb.profile.index'),
      // disabled: true,
      to: localePath('profile'),
    },
  ],
  organization: [
    {
      text: i18n.t('breadcrumb.organization.index'),
      // disabled: true,
      to: localePath('organization'),
    },
  ],
  master: [
    {
      text: i18n.t('breadcrumb.master.index'),
      // disabled: true,
      to: localePath('master'),
    },
  ],
})
