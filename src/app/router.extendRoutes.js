export default function (routes, resolve) {
  routes.push({
    name: 'not-found',
    path: '*',
    component: resolve('~/pages/error/404.vue'),
  })
}
