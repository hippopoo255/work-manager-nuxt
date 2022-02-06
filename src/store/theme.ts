import { GetterTree, ActionTree, MutationTree } from 'vuex'
import LocalStorage from '~/lib/storage'

export const storageLogs = new LocalStorage('theme')

type ThemeStateProp = {
  darkMode: boolean
}

const state = (): ThemeStateProp => ({
  darkMode: false,
})

type ThemeState = ReturnType<typeof state>

const mutations: MutationTree<ThemeState> = {
  setDarkMode(state: ThemeStateProp, darkMode: boolean) {
    state.darkMode = darkMode
  },
}

const getters: GetterTree<ThemeState, ThemeState> = {
  currentDarkMode: (state: ThemeStateProp) => state.darkMode,
}

const actions: ActionTree<ThemeState, ThemeState> = {
  toggleDarkMode: ({ commit }, darkMode: boolean) => {
    storageLogs.regist(darkMode)
    commit('setDarkMode', darkMode)
  },
  init: ({ commit }) => {
    storageLogs.init()
    commit('setDarkMode', storageLogs.data[0])
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
