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
  | 'default'

const errorKeys = {
  UserNotFoundException: 'login_id',
  NotAuthorizedException: 'login_id',
  UserNotConfirmedException: 'login_id',
  UsernameExistsException: 'login_id',
  CodeMismatchException: 'verification_code',
  InvalidParameterException: 'password',
  InvalidPasswordException: 'password',
  LimitExceededException: 'password',
  ExpiredCodeException: 'login_id',
  default: 'login_id',
}

export const handleError = (error: any) => {
  const status = 400
  if (error.code === undefined) {
    throw error
  }
  const errCode = error.code as CognitoErrorMessageType

  const key = errorKeys[errCode]
  const data = {
    message: {
      [key]: [error.message],
    },
  }
  // const { key, message } = getErrorBody(errCode, specifiedKey)
  // eslint-disable-next-line no-throw-literal
  throw { status, data }
}
