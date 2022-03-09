<template>
  <div>
    <v-menu bottom min-width="200px" rounded offset-y>
      <template #activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="orange" size="36">
            <v-img v-if="admin.file_path" :src="facePath"></v-img>
            <span v-else class="white--text">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center pb-0">
          <div class="mx-auto text-center">
            <v-avatar color="orange">
              <span class="white--text text-h5">{{ initials }}</span>
            </v-avatar>
            <h3 class="mt-3">{{ admin.full_name }}</h3>
            <p class="text-caption mt-1">
              {{ admin.email }}
            </p>
            <v-divider></v-divider>
            <v-btn
              depressed
              tile
              text
              style="width: 100%"
              router
              exact
              x-large
              :to="localePath('profile')"
              >{{ $t('link.profile') }}</v-btn
            >
            <v-divider></v-divider>
            <v-btn
              depressed
              tile
              text
              x-large
              style="width: 100%"
              @click="signout"
            >
              {{ $t('submit.signout') }}
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { faceUrl } from '@/lib/util'
import { Admin } from '@/types/ts-axios'
import { useAuth } from '~/hooks'

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
    const initials = computed(() => props.admin.family_name[0] || '')
    const facePath = computed(() =>
      props.admin.file_path ? faceUrl(props.admin.file_path) : ''
    )
    const { signout } = useAuth()
    return { facePath, initials, signout }
  },
})
</script>
