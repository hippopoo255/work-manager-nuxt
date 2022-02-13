import { AccountVerificationInputs } from '.'
export interface ResetForgottenPasswordInputs
  extends AccountVerificationInputs {
  password: string
  password_confirmation: string
}
