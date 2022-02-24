import { ActionTree, ActionContext } from 'vuex'
// import { cognitoAuth } from '@/lib/auth/cognito'

type RootState = ReturnType<any>

export const actions: ActionTree<any, any> = {
  async nuxtServerInit(_context: ActionContext<RootState, RootState>) {
    // await cognitoAuth.currentAdmin()
  },
}
