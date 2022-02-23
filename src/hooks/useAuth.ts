import { useContext, useRouter } from '@nuxtjs/composition-api'
import { cognitoAuth } from '~/lib/auth/cognito'
import { CognitoErrorBody, INTERNAL_SERVER_ERROR } from '@/config'
import {
  AccountVerificationInputs,
  ForgotPasswordInputs,
  ResetForgottenPasswordInputs,
  SigninInputs,
  SignupInputs,
} from '~/types/ts-axios'
import { encode64 } from '~/lib/util'

const useAuth = () => {
  const { app, store, i18n } = useContext()
  const router = useRouter()

  const cognitoErrorhandler = ({ status, data }: CognitoErrorBody) => {
    const [key, errType] = data.message.split('.')
    const message = { [key]: i18n.t(`alert.error.cognito.${errType}`) }
    store.dispatch('status/updateResponse', {
      status,
      message,
    })
    return ''
  }

  const currentAdmin = async () => {
    const admin = await cognitoAuth.currentAdmin().catch(({ status, data }) => {
      if (status === INTERNAL_SERVER_ERROR) {
        // Laravel Errorの場合
        store.dispatch('status/updateResponse', {
          status,
          message: data.message,
        })
      } else {
        // Cognito Errorの場合
        const [key, errType] = data.message.split('.')
        const message = { [key]: errType }
        store.dispatch('status/updateResponse', {
          status,
          message,
        })
      }
    })
    store.dispatch('admin/signin', admin)
  }

  const forgotPassword = async (inputs: ForgotPasswordInputs) => {
    return await cognitoAuth
      .forgotPassword(inputs)
      .then(({ data, status }) => {
        const key = Object.keys(data.message)[0]
        store.dispatch('status/updateResponse', {
          status,
          message: {
            [key]: i18n.t('alert.success.forgotPassword'),
          },
        })
        setTimeout(() => {
          router.push(
            app.localePath({
              name: 'password-reset',
              query: {
                n: encode64(inputs.login_id),
              },
            })
          )
        }, 5000)
      })
      .catch((err) => {
        return cognitoErrorhandler(err)
      })
  }

  const resetForgottenPassword = async (
    inputs: ResetForgottenPasswordInputs
  ) => {
    await cognitoAuth
      .resetForgottenPassword(inputs)
      .then(({ data, status }) => {
        store.dispatch('status/updateResponse', {
          status,
          message: {
            [data.message.SUCCESS]: i18n.t('alert.success.resetPassword'),
          },
        })
        setTimeout(() => {
          router.push(app.localePath('signin'))
        }, 5000)
      })
      .catch((err) => {
        return cognitoErrorhandler(err)
      })
  }

  const signin = async (inputs: SigninInputs) => {
    const signedInAdmin = await cognitoAuth
      .signin(inputs)
      .catch((err) => cognitoErrorhandler(err))
    if (signedInAdmin) {
      store.dispatch('admin/signin', signedInAdmin)
      router.push(app.localePath('dashboard'))
    }
  }

  const signout = async () => {
    await cognitoAuth
      .signout()
      .then(() => {
        store.dispatch('admin/signout')
        router.push(app.localePath('signin'))
      })
      .catch((err) => cognitoErrorhandler(err))
  }

  const signup = async (inputs: SignupInputs) => {
    const response = await cognitoAuth
      .signup(inputs)
      .catch((err) => cognitoErrorhandler(err))
    if (response) {
      store.dispatch('status/updateResponse', {
        status: 201,
        message: {
          success: i18n.t('alert.success.signup'),
        },
      })
      setTimeout(() => {
        router.push(
          app.localePath({
            name: 'account_verification',
            query: {
              n: encode64(inputs.login_id),
            },
          })
        )
      }, 5000)
    }
  }

  const testSignin = async () => {
    const signedInAdmin = await cognitoAuth
      .testSignin()
      .catch((err) => cognitoErrorhandler(err))
    if (signedInAdmin) {
      store.dispatch('admin/signin', signedInAdmin)
    }
  }

  const verifyAdmin = async (inputs: AccountVerificationInputs) => {
    await cognitoAuth
      .verifyAdmin(inputs)
      .then(({ status, data }) => {
        store.dispatch('status/updateResponse', {
          status,
          message: {
            [data.message.SUCCESS]: i18n.t('alert.success.verify'),
          },
        })
        setTimeout(() => {
          router.push(app.localePath('signin'))
        }, 5000)
      })
      .catch((err) => {
        return cognitoErrorhandler(err)
      })
  }

  return {
    currentAdmin,
    forgotPassword,
    resetForgottenPassword,
    signin,
    signout,
    signup,
    testSignin,
    verifyAdmin,
  }
}

export default useAuth
