import { NuxtI18nInstance } from 'nuxt-i18n'
import { TranslateResult } from 'vue-i18n'
import Vue from 'vue'

type Breadcrumb = {
  text: TranslateResult
  to: string
  disabled?: boolean
}

type BreadcrumbData = { [k: string]: Breadcrumb[] }

export const breadcrumbData = (
  i18n: NuxtI18nInstance,
  localePath: Vue['localePath'],
  params: { [k: string]: string }
): BreadcrumbData => ({
  dashboard: [],
  user: [
    {
      text: i18n.t('breadcrumb.user.index'),
      disabled: true,
      to: localePath('user'),
    },
  ],
  'user-create': [
    {
      text: i18n.t('breadcrumb.user.create'),
      disabled: true,
      to: localePath('user-create'),
    },
  ],
  'user-id': [
    {
      text: i18n.t('breadcrumb.user.index'),
      to: localePath('user'),
    },
    {
      text: i18n.t('breadcrumb.user.id', {
        id: params.id || '',
      }),
      disabled: true,
      to: localePath({
        name: 'user-id',
        params: {
          id: '0',
          ...params,
        },
      }),
    },
  ],
  'user-edit-id': [
    {
      text: i18n.t('breadcrumb.user.index'),
      to: localePath('user'),
    },
    {
      text: i18n.t('breadcrumb.user.id', {
        id: params.id || '',
      }),
      to: localePath({
        name: 'user-id',
        params: {
          id: '0',
          ...params,
        },
      }),
    },
    {
      text: i18n.t('breadcrumb.user.edit'),
      disabled: true,
      to: localePath({
        name: 'user-edit-id',
        params: {
          id: '0',
          ...params,
        },
      }),
    },
  ],
  admin: [
    {
      text: i18n.t('breadcrumb.admin.index'),
      disabled: true,
      to: localePath('admin'),
    },
  ],
  'admin-id': [
    {
      text: i18n.t('breadcrumb.admin.index'),
      to: localePath('admin'),
    },
    {
      text: i18n.t('breadcrumb.admin.id', {
        id: params.id || '',
      }),
      disabled: true,
      to: localePath({
        name: 'admin-id',
        params: {
          id: '0',
          ...params,
        },
      }),
    },
  ],
  'blog-report': [
    {
      text: i18n.t('breadcrumb.blog.report'),
      disabled: true,
      to: localePath('blog-report'),
    },
  ],
  'chat-report': [
    {
      text: i18n.t('breadcrumb.chat.report'),
      disabled: true,
      to: localePath('chat-report'),
    },
  ],
  setting: [
    {
      text: i18n.t('breadcrumb.setting.index'),
      disabled: true,
      to: localePath('setting'),
    },
  ],
  profile: [
    {
      text: i18n.t('breadcrumb.profile.index'),
      disabled: true,
      to: localePath('profile'),
    },
  ],
  organization: [
    {
      text: i18n.t('breadcrumb.organization.index'),
      disabled: true,
      to: localePath('organization'),
    },
  ],
  master: [
    {
      text: i18n.t('breadcrumb.master.index'),
      disabled: true,
      to: localePath('master'),
    },
  ],
  'master-meeting_room': [
    {
      text: i18n.t('breadcrumb.master.index'),
      to: localePath('master'),
    },
    {
      text: i18n.t('breadcrumb.master.meeting_room.index'),
      disabled: true,
      to: localePath('/master/meeting_room'),
    },
  ],
  'master-department': [
    {
      text: i18n.t('breadcrumb.master.index'),
      to: localePath('master'),
    },
    {
      text: i18n.t('breadcrumb.master.department.index'),
      disabled: true,
      to: localePath('/master/department'),
    },
  ],
  'master-progress': [
    {
      text: i18n.t('breadcrumb.master.index'),
      to: localePath('master'),
    },
    {
      text: i18n.t('breadcrumb.master.progress.index'),
      disabled: true,
      to: localePath('/master/progress'),
    },
  ],
})
