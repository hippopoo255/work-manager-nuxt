<template>
  <div>
    <v-menu bottom min-width="200px" rounded offset-y>
      <template #activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="brown" size="36">
            <span class="white--text">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="white--text text-h5">{{ initials }}</span>
            </v-avatar>
            <h3 class="mt-3">{{ admin.full_name }}</h3>
            <p class="text-caption mt-1">
              {{ admin.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text>{{ $t('link.profile') }}</v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="signout">
              {{ $t('submit.signout') }}
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  useRouter,
  PropType,
} from '@nuxtjs/composition-api'

import { Admin } from '@/types/ts-axios'

export default defineComponent({
  name: 'AuthMenuAvatar',
  props: {
    admin: {
      type: Object as PropType<Admin>,
      required: true,
      default: () => ({
        full_name: '',
        family_name: '',
        email: '',
      }),
    },
  },
  setup(props) {
    const { store, app } = useContext()
    const router = useRouter()
    // const admin = computed(() => ({
    //   initials: 'JD',
    //   fullName: 'John Doe',
    //   email: 'john.doe@doe.com',
    // }))

    const initials = computed(() => props.admin.family_name[0] || '')

    const signout = async () => {
      const responseMsg = await store.dispatch('admin/signout')
      if (responseMsg === 'SUCCESS') {
        router.push(app.localePath('signin'))
      }
    }
    return { initials, signout }
  },
})
</script>
