<template>
  <v-card max-width="400" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col v-if="admin" cols="12">
          <AuthenticatableCard :authenticatable="admin" :menus="menus" />
        </v-col>
        <v-col cols="12">
          <!-- TODO: ActivityList -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import { useAdmin } from '@/hooks'
import { Admin } from '~/types/ts-axios'
import { APP_STORAGE_URL } from '@/config'

export default defineComponent({
  name: 'AdminDetailList',
  setup() {
    const { show } = useAdmin()
    const { store } = useContext()
    const route = useRoute()
    const loading = ref(false)
    const admin = ref<Admin | null>(null)
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const facePath = computed(() => {
      return APP_STORAGE_URL + `/${admin.value?.file_path}`
    })
    const bgPath = computed(() => {
      return admin.value?.organization?.file_path
        ? APP_STORAGE_URL + `/${admin.value.organization.file_path}`
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    })

    const menus = computed(() => [
      // {
      //   btnText: i18n.t('submit.inviteAdmin'),
      //   handle: () => {},
      //   color: 'primary',
      //   disabled: loading.value,
      // },
    ])

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          const param = route.value.params
          await show(Number(param.id)).then((ad) => {
            admin.value = ad
          })
        }
      },
      { immediate: true }
    )
    return {
      bgPath,
      facePath,
      loading,
      menus,
      admin,
    }
  },
})
</script>
