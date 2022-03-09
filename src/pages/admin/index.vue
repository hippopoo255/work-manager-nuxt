<template>
  <div>
    <h2 class="c-page-title text-center">{{ $t('page.title.admin.index') }}</h2>
    <Loader v-if="loading" />
    <AuthenticatableTable
      v-else
      :headers="headers"
      :items="admins"
      model="admin"
    />
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
    const loading = ref(true)
    const admins = ref<Admin[]>([])
    const isSignin = computed(() => store.getters['admin/isSignin'])
    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await index()
            .then((ads) => {
              admins.value = ads
            })
            .finally(() => {
              loading.value = false
            })
        }
      },
      { immediate: true }
    )
    const headers = computed(() => adminTableHeaders.index(i18n))
    return {
      admins,
      headers,
      loading,
    }
  },
})
</script>

<style scoped></style>
