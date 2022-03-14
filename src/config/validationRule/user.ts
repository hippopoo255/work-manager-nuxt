import { NuxtI18nInstance } from 'nuxt-i18n'
import { strPatterns, length } from './util'
import { UserInputs } from '~/types/ts-axios'

export const userCreateRule = (i18n: NuxtI18nInstance) => ({
  // メールアドレス: 必須, メール形式, 最小8文字, 最大255文字
  email: [
    (v: UserInputs['email']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.email'),
      }),
    (v: UserInputs['email']) =>
      strPatterns.email.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.email'),
      }),
    (v: UserInputs['email']) =>
      v.length >= length.email[0] ||
      i18n.t('validation.min', {
        attribute: i18n.t('attribute.email'),
        length: length.email[0],
      }),
    (v: UserInputs['email']) =>
      v.length <= length.email[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.email'),
        length: length.email[1],
      }),
  ],
  // 姓: 必須, 最大128文字
  family_name: [
    (v: UserInputs['family_name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.family_name'),
      }),
    (v: UserInputs['family_name']) =>
      v.length <= length.default[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.family_name'),
        length: length.default[1],
      }),
  ],
  // セイ: 必須, カタカナ, 最大128文字
  family_name_kana: [
    (v: UserInputs['family_name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.family_name'),
      }),
    (v: UserInputs['family_name_kana']) =>
      strPatterns.katakana.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.family_name_kana'),
      }),
    (v: UserInputs['family_name_kana']) =>
      v.length <= length.default[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.family_name_kana'),
        length: length.default[1],
      }),
  ],
  // 名: 必須, 最大128文字
  given_name: [
    (v: UserInputs['given_name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.given_name'),
      }),
    (v: UserInputs['given_name']) =>
      v.length <= length.default[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.given_name'),
        length: length.default[1],
      }),
  ],
  // メイ: 必須, カタカナ, 最大128文字
  given_name_kana: [
    (v: UserInputs['given_name']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.given_name'),
      }),
    (v: UserInputs['given_name_kana']) =>
      strPatterns.katakana.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.given_name_kana'),
      }),
    (v: UserInputs['given_name_kana']) =>
      v.length <= length.default[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.given_name_kana'),
        length: length.default[1],
      }),
  ],
  department_id: [
    (v: UserInputs['department_id']) =>
      !v ||
      strPatterns.alphaNumeric.test(String(v)) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.department_id'),
      }),
  ],
})
