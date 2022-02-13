// import userPool from './userPool'
import { Auth } from 'aws-amplify'
import { ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js'
import { AxiosRequestConfig } from 'axios'
import { handleError } from './util'
import { cognitoTestAdmin, amplifyConfigure } from './config'
import { getRequest } from '@/lib/axios'

// import { requestUri, getRequest } from '@/api'
import { decode64 } from '@/lib/util'
import { AuthenticatedAdmin, Admin } from '@/types/ts-axios'

import {
  AccountVerificationInputs,
  ForgotPasswordInputs,
  PasswordResetInputs,
  ResetForgottenPasswordInputs,
  SigninInputs,
  SignupInputs,
} from '@/types/inputs'

amplifyConfigure()

const currentAdmin = async (currentAdminPath: string = '/admin/current') => {
  const authResult: '' | CognitoUserSession = await Auth.currentSession().catch(
    () => {
      return ''
    }
  )
  if (authResult === '') {
    return authResult
  }
  // eslint-disable-next-line no-extra-boolean-cast
  const result = authResult.getIdToken()
  const jwt = result.getJwtToken()
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: jwt || '',
    },
  }

  const admin: Admin | '' = await getRequest<Admin | ''>({
    path: currentAdminPath,
    config,
  }).catch((err) => {
    throw err
  })

  if (admin === '') {
    return admin
  }

  return {
    ...admin,
    jwt,
  } as AuthenticatedAdmin
}

const forgotPassword = async ({ login_id }: ForgotPasswordInputs) => {
  const response = await Auth.forgotPassword(login_id).catch((error) => {
    handleError(error, 'reset password error')
    return ''
  })
  const key = response !== '' ? 'SUCCESS' : 'FAILED'
  return {
    data: {
      message: {
        [key]:
          'メールアドレスに検証用コードを送信しました。\n次の画面で検証コードと新しいパスワードを入力してください。',
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
  const result = await Auth.forgotPasswordSubmit(
    username,
    verification_code,
    password
  ).catch((error) => {
    handleError(error, 'reset password error')
    return ''
  })
  if (result === 'SUCCESS') {
    return {
      data: {
        message: {
          SUCCESS:
            '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
        },
      },
      status: 200,
    }
  } else {
    return {
      data: {
        message: {
          FAILED: '再設定に失敗しました',
        },
      },
      status: 400,
    }
  }
}

const resetPassword = async ({
  old_password,
  password,
}: PasswordResetInputs) => {
  const response = await Auth.currentAuthenticatedUser()
    .then((user) => {
      return Auth.changePassword(user, old_password, password)
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      handleError(error, 'incorrect password')
      return {}
    })
  return response
}

const signin = async ({ login_id, password }: SigninInputs) => {
  await Auth.signIn(login_id, password).catch((error) => {
    handleError(error)
  })
  return await currentAdmin()
}

const signout = async () => {
  await Auth.signOut().catch((error) => {
    handleError(error, 'logout failed')
  })
  console.log('logout succeeded')
  return 'SUCCESS'
}

const signup = async ({ email, login_id, password, address }: SignupInputs) => {
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: login_id,
      password,
      attributes: {
        email, // optional
        address: address || '', // optional - E.164 number convention
        // given_name: '太郎',
        // family_name: 'テスト',
        // other custom attributes
        'custom:login_id': login_id,
        // 'custom:given_name_kana': '太郎',
        // 'custom:family_name_kana': 'テスト',
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    console.log('signup succeeded')
    // router.push({
    //   name: app.localePath('account_verification'),
    //   query: {
    //     n: encode64(login_id),
    //   },
    // })
    return user
  } catch (error) {
    handleError(error, 'sign up failed')
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
  const result = await Auth.confirmSignUp(login_id, verification_code).catch(
    (error) => {
      handleError(error, 'confirmation error')
    }
  )
  if (result === 'SUCCESS') {
    // console.log('confirmation success:', result)
    // alert(
    //   '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください'
    // )
    // router.push({ name: app.localePath('signin') })
  }
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
