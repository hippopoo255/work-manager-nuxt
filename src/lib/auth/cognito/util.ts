import { errorKeys, CognitoErrorMessageType } from '@/config'

export const handleError = (error: any) => {
  const status = 400
  if (error.code === undefined) {
    throw error
  }
  const errType = error.code as CognitoErrorMessageType

  const key = errorKeys[errType] || errorKeys.default
  const data = {
    message: `${key}.${errType}`,
  }
  // eslint-disable-next-line no-throw-literal
  throw { status, data }
}
