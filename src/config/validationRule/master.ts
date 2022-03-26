import { NuxtI18nInstance } from 'nuxt-i18n'
import { strPatterns, length } from './util'
import {
  DepartmentInputs,
  ProgressInputs,
  MeetingPlaceInputs,
} from '~/types/ts-axios'

export const departmentRule = (i18n: NuxtI18nInstance) => ({
  // 部署名: 必須, 最大128文字
  name: [
    (v: DepartmentInputs['name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.name.department'),
      }),
    (v: DepartmentInputs['name']) =>
      v.length <= length.default[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.name.department'),
        length: length.default[1],
      }),
  ],
  // 部署コード: 任意, 最大64文字
  department_code: [
    (v: DepartmentInputs['department_code']) =>
      !v ||
      v.length <= length.short[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.department_code'),
        length: length.short[1],
      }),
    (v: DepartmentInputs['department_code']) =>
      !v ||
      strPatterns.alphaNumeric.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.department_code'),
      }),
  ],
  // 色: 必須, カタカナ, 最大128文字
  color: [
    (v: DepartmentInputs['color']) =>
      !v ||
      v.length <= length.short[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.color'),
        length: length.short[1],
      }),
  ],
})

export const progressRule = (i18n: NuxtI18nInstance) => ({
  // 進捗度の名前: 必須, 最大64文字
  name: [
    (v: ProgressInputs['name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.name.progress'),
      }),
    (v: ProgressInputs['name']) =>
      v.length <= length.short[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.name.progress'),
        length: length.short[1],
      }),
  ],
  // 値: 任意, 最大64文字
  value: [
    (v: ProgressInputs['value']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.value.progress'),
      }),
    (v: ProgressInputs['value']) =>
      Number(v) >= length.value.default[0] ||
      i18n.t('validation.minNum', {
        attribute: i18n.t('attribute.value.progress'),
        length: length.value.default[0],
      }),
    (v: ProgressInputs['value']) =>
      !v ||
      Number(v) <= length.value.default[1] ||
      i18n.t('validation.maxNum', {
        attribute: i18n.t('attribute.value.progress'),
        length: length.value.default[1],
      }),
  ],
})

export const meetingRoomRule = (i18n: NuxtI18nInstance) => ({
  // 部署名: 必須, 最大64文字
  name: [
    (v: MeetingPlaceInputs['name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.name.meeting_room'),
      }),
    (v: MeetingPlaceInputs['name']) =>
      v.length <= length.short[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.name.meeting_room'),
        length: length.short[1],
      }),
  ],
})
