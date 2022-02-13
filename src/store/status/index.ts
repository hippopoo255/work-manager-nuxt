import { GetterTree, ActionTree, MutationTree } from 'vuex'

type Response = {
  [k: string]: string[] | string
}
type ResponseStateProp = {
  status: number | null
  message: Response | null
}

const state = (): ResponseStateProp => ({
  status: null,
  message: null,
})

type ResponseState = ReturnType<typeof state>

const mutations: MutationTree<ResponseState> = {
  setResponse(state: ResponseState, status: ResponseStateProp) {
    state.status = status.status
    state.message = status.message
  },
}

const getters: GetterTree<ResponseState, ResponseState> = {
  status: (state: ResponseStateProp) => state.status,
  message: (state: ResponseStateProp) => state.message,
}

const actions: ActionTree<ResponseState, ResponseState> = {
  updateResponse: ({ commit }, { status, message }: ResponseState) => {
    commit('setResponse', {
      status,
      message,
    })
  },
  clearResponse: ({ commit }) => {
    commit('setResponse', {
      status: null,
      message: null,
    })
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
