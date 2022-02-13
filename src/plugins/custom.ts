import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

const SAMPLE = 'testだよ'

export default (context: Context, inject: Inject) => {
  context.SAMPLE = SAMPLE
  // Vuex ストア内でも"this.$SAMPLE"として呼び出したい場合
  inject('i18n', context.i18n)
}
