import { NuxtI18nInstance } from 'nuxt-i18n'
import { strPatterns, length } from './util'
import { OrganizationInputs } from '~/types/ts-axios'

export const organizationUpdateRule = (i18n: NuxtI18nInstance) => ({
  // 組織名: 必須, 最大255文字
  name: [
    (v: OrganizationInputs['name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.name'),
      }),
    (v: OrganizationInputs['name']) =>
      v.length >= length.default[0] ||
      i18n.t('validation.min', {
        attribute: i18n.t('attribute.organization.name'),
        length: length.default[0],
      }),
    (v: OrganizationInputs['name']) =>
      v.length <= length.default[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.organization.name'),
        length: length.default[1],
      }),
  ],
  // 組織名カナ: 必須, カタカナ, 最大255文字
  name_kana: [
    (v: OrganizationInputs['name_kana']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.name_kana'),
      }),
    (v: OrganizationInputs['name_kana']) =>
      strPatterns.katakana.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.organization.name_kana'),
      }),
    (v: OrganizationInputs['name_kana']) =>
      v.length <= length.long[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.organization.name_kana'),
        length: length.long[1],
      }),
  ],
  // 郵便番号: 必須, 郵便番号, 最大128文字
  postal_code: [
    (v: OrganizationInputs['postal_code']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.postal_code'),
      }),
    (v: OrganizationInputs['postal_code']) =>
      strPatterns.postal.test(String(v)) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.organization.postal_code'),
      }),
  ],
  // 都道府県ID: 必須, 最大128文字
  pref_id: [
    (v: OrganizationInputs['pref_id']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.pref_id'),
      }),
    (v: OrganizationInputs['pref_id']) =>
      strPatterns.alphaNumeric.test(String(v)) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.organization.pref_id'),
      }),
  ],
  // 市区町村: 必須, 最大64文字
  city: [
    (v: OrganizationInputs['city']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.city'),
      }),
    (v: OrganizationInputs['city']) =>
      v.length <= length.short[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.organization.city'),
        length: length.short[1],
      }),
  ],
  // 以降の住所: 必須, 以降の住所, 最大255文字
  address: [
    (v: OrganizationInputs['address']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.address'),
      }),
    (v: OrganizationInputs['address']) =>
      v.length <= length.long[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.organization.address'),
        length: length.long[1],
      }),
  ],
  // 電話番号: 必須, 0-9, 最大11文字
  tel: [
    (v: OrganizationInputs['tel']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.organization.tel'),
      }),
    (v: OrganizationInputs['tel']) =>
      strPatterns.tel.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.organization.tel'),
      }),
  ],
})
