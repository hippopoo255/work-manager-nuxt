import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { AuthenticatedAdmin } from '@/types/ts-axios'
import {
  ForgotPasswordInputs,
  ResetForgottenPasswordInputs,
  SigninInputs,
} from '@/types/inputs'
import cognitoAuth from '@/lib/auth/cognito/cognitoAuth'

// TODO: 分離
type AdminStateProp = {
  admin: AuthenticatedAdmin | ''
}

const state = (): AdminStateProp => ({
  admin: '',
})

type AdminState = ReturnType<typeof state>

const mutations: MutationTree<AdminState> = {
  setAdmin(state: AdminState, admin: AdminStateProp['admin']) {
    state.admin = admin
  },
}

const getters: GetterTree<AdminState, AdminState> = {
  currentAdmin: (state: AdminStateProp) => state.admin,
  isSignin: (state: AdminStateProp) => state.admin !== '',
}

const actions: ActionTree<AdminState, AdminState> = {
  signin: async ({ commit, dispatch }, inputs: SigninInputs) => {
    const loggedInAdmin = await cognitoAuth
      .signin(inputs)
      .catch(({ status, data }) => {
        dispatch('handleCognitoResponse', {
          status,
          message: data.message,
        })
        return ''
      })
    if (loggedInAdmin !== '') {
      commit('setAdmin', loggedInAdmin)
    }
    return loggedInAdmin
  },
  testSignin: async ({ commit, dispatch }) => {
    const testAdmin = await cognitoAuth
      .testSignin()
      .catch(({ status, data }) => {
        dispatch('handleCognitoResponse', {
          status,
          message: data.message,
        })
        return ''
      })
    if (testAdmin) {
      commit('setAdmin', testAdmin)
    }
    return testAdmin
  },
  signout: async ({ commit, dispatch }) => {
    const response = await cognitoAuth.signout().catch(({ status, data }) => {
      dispatch('handleCognitoResponse', {
        status,
        message: data.message,
      })
      return ''
    })
    if (response === 'SUCCESS') {
      commit('setAdmin', '')
    }
    return response
  },
  signup: async () => {
    // ...
  },
  currentAdmin: async ({ commit, dispatch }) => {
    const admin = await cognitoAuth.currentAdmin().catch(({ status, data }) => {
      dispatch('handleCognitoResponse', {
        status,
        message: data.message,
      })
      return ''
    })
    commit('setAdmin', admin)
    return admin
  },
  forgotPassword: async ({ dispatch }, inputs: ForgotPasswordInputs) => {
    const msg = await cognitoAuth
      .forgotPassword(inputs)
      .then(({ status, data }) => {
        dispatch('handleCognitoResponse', {
          status,
          message: data.message,
        })
        return Object.keys(data.message)[0]
      })
      .catch(({ status, data }) => {
        dispatch('handleCognitoResponse', {
          status,
          message: data.message,
        })
        return ''
      })
    return msg
  },
  resetForgottenPassword: async (
    { dispatch },
    inputs: ResetForgottenPasswordInputs
  ) => {
    const response = await cognitoAuth
      .resetForgottenPassword(inputs)
      .then(({ data, status }) => {
        dispatch('handleCognitoResponse', {
          status,
          message: data.message,
        })
        return Object.keys(data.message)[0]
      })
      .catch(({ status, data }) => {
        dispatch('handleCognitoResponse', {
          status,
          message: data.message,
        })
        return ''
      })
    return response
  },
  handleCognitoResponse: ({ dispatch }, { message, status }) => {
    dispatch(
      'status/updateResponse',
      {
        status,
        message,
      },
      { root: true }
    )
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
