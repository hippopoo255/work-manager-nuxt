import { ActionTree, ActionContext } from 'vuex'
import { cognitoAuth } from '@/lib/auth/cognito'

type RootState = ReturnType<any>

export const actions: ActionTree<any, any> = {
  async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
    const admin = await cognitoAuth.currentAdmin()
    commit('admin/setAdmin', admin)
  },
}
