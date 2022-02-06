import { Middleware, Context } from '@nuxt/types'

const authentication: Middleware = ({
  store,
  redirect,
  route,
}: Context): void => {
  // user.tsの"user"というstateをチェック
  if (!store.state.user.user) {
    // パスよりpathnameで指定したほうが良い
    redirect({
      name: 'login',
      params: {
        before: route.fullPath,
      },
    })
  }
}

export default authentication
