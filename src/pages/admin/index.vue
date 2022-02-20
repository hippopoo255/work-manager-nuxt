<template>
  <div>
    <h2 class="c-page-title text-center">{{ $t('page.title.admin.index') }}</h2>
    <CustomTable :headers="headers" :items="admins" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { useAdmin } from '~/hooks'
import { Admin } from '~/types/ts-axios'
import { adminTableHeaders } from '@/config/table'

export default defineComponent({
  name: 'AdminIndex',
  layout: 'default',
  setup() {
    const { index } = useAdmin()
    const { i18n, store } = useContext()
    const admins = ref<Admin[]>([])
    const isSignin = computed(() => store.getters['admin/isSignin'])
    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await index().then((ads) => {
            admins.value = ads
          })
        }
      },
      { immediate: true }
    )
    const headers = computed(() => adminTableHeaders.index(i18n))
    return {
      admins,
      headers,
    }
  },
})
</script>

<style scoped></style>
