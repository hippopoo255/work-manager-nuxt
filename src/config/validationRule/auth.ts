import { NuxtI18nInstance } from 'nuxt-i18n'
import { strPatterns, length } from './util'
import {
  ForgotPasswordInputs,
  ResetForgottenPasswordInputs,
  SignupInputs,
  SigninInputs,
} from '~/types/inputs'

export const signupRule = (i18n: NuxtI18nInstance) => ({
  // メールアドレス: 必須, メール形式, 最小8文字, 最大255文字
  email: [
    (v: SignupInputs['email']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.email'),
      }),
    (v: SignupInputs['email']) =>
      strPatterns.email.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.email'),
      }),
    (v: SignupInputs['email']) =>
      v.length <= length.email[0] ||
      i18n.t('validation.min', {
        attribute: i18n.t('attribute.email'),
        length: length.email[0],
      }),
    (v: SignupInputs['email']) =>
      v.length <= length.email[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.email'),
        length: length.email[1],
      }),
  ],
  // ログインID: 必須, 最小8文字, 最大32文字
  login_id: [
    (v: SignupInputs['login_id']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.login_id'),
      }),
    (v: SignupInputs['login_id']) =>
      v.length >= length.login_id[0] ||
      i18n.t('validation.min', {
        attribute: i18n.t('attribute.login_id'),
        length: length.login_id[0],
      }),
    (v: SignupInputs['login_id']) =>
      v.length <= length.login_id[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.login_id'),
        length: length.login_id[1],
      }),
  ],
  // パスワード: 必須, 大文字・小文字・数字を含む, 最小8文字, 最大64文字
  password: [
    (v: SignupInputs['password']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.password'),
      }),
    (v: SignupInputs['password']) =>
      v.length >= length.password[0] ||
      i18n.t('validation.min', {
        attribute: i18n.t('attribute.password'),
        length: length.password[0],
      }),
    (v: SignupInputs['password']) =>
      v.length <= length.password[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.password'),
        length: length.password[1],
      }),
    (v: SignupInputs['password']) =>
      strPatterns.password.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.password'),
      }),
  ],
  // パスワード: 必須, パスワードと一致
  password_confirmation: (compare: SignupInputs['password']) => [
    (v: SignupInputs['password_confirmation']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.password_confirmation'),
      }),
    (v: SignupInputs['password_confirmation']) =>
      strPatterns.confirm(compare).test(v) ||
      i18n.t('validation.confirmation', {
        attribute: i18n.t('attribute.password_confirmation'),
      }),
  ],
})

export const signinRule = (i18n: NuxtI18nInstance) => ({
  login_id: [
    (v: SigninInputs['login_id']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.login_id'),
      }),
  ],
  password: [
    (v: SigninInputs['password']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.password'),
      }),
  ],
})

export const forgotPasswordRule = (i18n: NuxtI18nInstance) => ({
  login_id: [
    (v: ForgotPasswordInputs['login_id']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.email'),
      }),
  ],
})

export const resetForgottenPasswordRule = (i18n: NuxtI18nInstance) => ({
  login_id: [
    (v: ResetForgottenPasswordInputs['login_id']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.email'),
      }),
  ],
  verification_code: [
    (v: ResetForgottenPasswordInputs['verification_code']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.verification_code'),
      }),
  ],
  password: [
    (v: ResetForgottenPasswordInputs['password']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.password'),
      }),
    (v: ResetForgottenPasswordInputs['password']) =>
      v.length >= length.password[0] ||
      i18n.t('validation.min', {
        attribute: i18n.t('attribute.password'),
        length: length.password[0],
      }),
    (v: ResetForgottenPasswordInputs['password']) =>
      v.length <= length.password[1] ||
      i18n.t('validation.max', {
        attribute: i18n.t('attribute.password'),
        length: length.password[1],
      }),
    (v: ResetForgottenPasswordInputs['password']) =>
      strPatterns.password.test(v) ||
      i18n.t('validation.pattern', {
        attribute: i18n.t('attribute.password'),
      }),
  ],
  password_confirmation: (
    compare: ResetForgottenPasswordInputs['password']
  ) => [
    (v: ResetForgottenPasswordInputs['password_confirmation']) =>
      !!v ||
      i18n.t('validation.required', {
        attribute: i18n.t('attribute.password_confirmation'),
      }),
    (v: ResetForgottenPasswordInputs['password_confirmation']) =>
      strPatterns.confirm(compare).test(v) ||
      i18n.t('validation.confirmation', {
        attribute: i18n.t('attribute.password_confirmation'),
      }),
  ],
})
