import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { AuthenticatedAdmin } from '@/types/ts-axios'
import { cognitoAuth } from '@/lib/auth/cognito'
import { INTERNAL_SERVER_ERROR } from '@/config'
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
  jwt: (state: AdminStateProp) =>
    !state.admin || state.admin.jwt === undefined ? '' : state.admin.jwt,
  isSignin: (state: AdminStateProp) => state.admin !== '',
}

const actions: ActionTree<AdminState, AdminState> = {
  signin: ({ commit, getters }, admin) => {
    commit('setAdmin', { ...admin, jwt: getters.jwt })
  },

  currentAdmin: async ({ commit, dispatch }) => {
    const admin = await cognitoAuth.currentAdmin().catch(({ status, data }) => {
      if (status === INTERNAL_SERVER_ERROR) {
        // Laravel Errorの場合
        dispatch(
          'status/updateResponse',
          {
            status,
            message: data.message,
          },
          { root: true }
        )
      } else {
        // Cognito Errorの場合
        const [key, errType] = data.message.split('.')
        const message = { [key]: errType }
        dispatch('status/updateResponse', {
          status,
          message,
        })
      }

      return ''
    })
    commit('setAdmin', admin)
    return admin
  },

  signout: ({ commit }) => {
    commit('setAdmin', '')
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
