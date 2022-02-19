interface AuthenticatableInputs {
  email: string
  family_name: string
  family_name_kana: string
  given_name: string
  given_name_kana: string
}

export interface UserInputs extends AuthenticatableInputs {}
export interface AdminInputs extends AuthenticatableInputs {}
