import { Middleware, Context } from '@nuxt/types'
// import

const authentication: Middleware = ({
  store,
  redirect,
  route,
  app,
}: Context): void => {
  // admin.tsの"admin"というstateをチェック
  if (!store.state.admin.admin) {
    // パスよりpathnameで指定したほうが良い
    redirect(
      app.localePath({
        name: 'signin',
        params: {
          before: route.fullPath,
        },
      })
    )
  }
}

export default authentication
