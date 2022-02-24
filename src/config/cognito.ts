export const errorKeys = {
  UserNotFoundException: 'login_id',
  NotAuthorizedException: 'login_id',
  UserNotConfirmedException: 'login_id',
  UsernameExistsException: 'login_id',
  CodeMismatchException: 'verification_code',
  InvalidParameterException: 'password',
  InvalidPasswordException: 'password',
  LimitExceededException: 'password',
  ExpiredCodeException: 'login_id',
  PasswordResetRequiredException: 'password',
  default: 'login_id',
}

export type CognitoErrorMessageType =
  // username が Cognito ユーザープールに存在しない
  | 'UserNotFoundException'
  // 認証に失敗した
  // 既にステータスが CONFIRMED
  // パスワードを間違い続けた場合
  | 'NotAuthorizedException'
  // ユーザのステータスがUNCONFIRMED
  | 'UserNotConfirmedException'
  // ユーザープール内に既に同じ username が存在する
  | 'UsernameExistsException'
  // 無効なコードが入力された
  | 'CodeMismatchException'
  // 必要な属性が足りない場合 or
  // 入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー） or
  // passwordが6文字未満の場合
  | 'InvalidParameterException'
  // ユーザープールのポリシーで設定したパスワードの強度を満たさない
  | 'InvalidPasswordException'
  // パスワード試行回数を超えた
  | 'LimitExceededException'
  // 検証が完了しているアカウントについて再度検証リクエストがあった
  | 'ExpiredCodeException'
  | 'PasswordResetRequiredException'
  | 'default'

export type CognitoErrorBody = {
  status: number
  data: {
    message: string
  }
}
