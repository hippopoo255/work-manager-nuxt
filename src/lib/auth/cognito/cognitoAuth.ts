// import userPool from './userPool'
import { Auth } from 'aws-amplify'
import { ISignUpResult } from 'amazon-cognito-identity-js'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { handleError } from './util'
import { cognitoTestAdmin, amplifyConfigure } from './config'
import { httpClient, handleIfErrorStatus, getErrorResponse } from '@/lib/axios'
import { decode64 } from '@/lib/util'
import { requestUri } from '@/config'
import {
  AccountVerificationInputs,
  ForgotPasswordInputs,
  AuthenticatedAdmin,
  Admin,
  PasswordResetInputs,
  ResetForgottenPasswordInputs,
  SigninInputs,
  SignupInputs,
} from '@/types/ts-axios'

amplifyConfigure()

const currentAdmin = async (currentAdminPath: string = requestUri.current) => {
  const authResult = await Auth.currentSession().catch((err) => {
    if (err === 'No current user') {
      return ''
    }
    throw handleError(err)
  })

  // eslint-disable-next-line no-extra-boolean-cast
  if (typeof authResult !== 'string') {
    const result = authResult.getIdToken()
    const jwt = result.getJwtToken()
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: jwt || '',
      },
    }
    const response: AxiosResponse<Admin> = await httpClient()
      .get<Admin>(currentAdminPath, config)
      .then((res) => {
        return res
      })
      .catch((err) => getErrorResponse<Admin>(err))

    handleIfErrorStatus(response)
    const admin = response.data

    return {
      ...admin,
      jwt,
    } as AuthenticatedAdmin
  }
  return authResult
}

const forgotPassword = async ({ login_id }: ForgotPasswordInputs) => {
  const response = await Auth.forgotPassword(login_id).catch((err) => {
    handleError(err)
  })
  const key = response
  return {
    data: {
      message: {
        [key]: key,
      },
    },
    status: 200,
  }
}

const resetForgottenPassword = async ({
  login_id,
  verification_code,
  password,
}: ResetForgottenPasswordInputs) => {
  const username = decode64(login_id)
  await Auth.forgotPasswordSubmit(username, verification_code, password).catch(
    (error) => {
      handleError(error)
    }
  )
  return {
    data: {
      message: {
        SUCCESS: 'SUCCESS',
      },
    },
    status: 200,
  }
}

const resetPassword = async ({
  old_password,
  password,
}: PasswordResetInputs) => {
  return await Auth.currentAuthenticatedUser()
    .then((user) => {
      return Auth.changePassword(user, old_password, password)
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      handleError(error)
    })
}

const signin = async ({ login_id, password }: SigninInputs) => {
  await Auth.signIn(login_id, password).catch((error) => {
    handleError(error)
  })
  return await currentAdmin()
}

const signout = async () => {
  await Auth.signOut().catch((error) => {
    handleError(error)
  })
  return 'SUCCESS'
}

const signup = async ({
  email,
  login_id,
  password,
  // address,
  family_name,
  family_name_kana,
  given_name,
  given_name_kana,
}: SignupInputs) => {
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: login_id,
      password,
      attributes: {
        email,
        given_name,
        family_name,
        // other custom attributes
        'custom:login_id': login_id,
        'custom:given_name_kana': given_name_kana,
        'custom:family_name_kana': family_name_kana,
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    return user
  } catch (error) {
    handleError(error)
  }
}

const testSignin = async () => {
  const data = {
    login_id: cognitoTestAdmin.name,
    password: cognitoTestAdmin.password,
  }
  return await signin(data)
}

const verifyAdmin = async ({
  login_id,
  verification_code,
}: AccountVerificationInputs) => {
  await Auth.confirmSignUp(login_id, verification_code).catch((error) => {
    handleError(error)
  })
  return {
    data: {
      message: {
        SUCCESS: 'SUCCESS',
      },
    },
    status: 200,
  }
  // alert(
  //   '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください'
  // )
}

const cognitoAuth = {
  currentAdmin,
  forgotPassword,
  resetForgottenPassword,
  resetPassword,
  signin,
  signout,
  signup,
  testSignin,
  verifyAdmin,
}

export default cognitoAuth
