<template>
  <v-card
    v-if="authenticatable"
    class="mx-auto text-left"
    max-width="434"
    :color="cardColor[0]"
    dark
  >
    <div class="d-flex flex-no-wrap justify-space-between overflow-hidden">
      <div>
        <v-card-title class="text-h5">{{
          authenticatable.full_name
        }}</v-card-title>
        <v-card-subtitle class="pr-0">{{
          authenticatable.department.name
        }}</v-card-subtitle>
        <v-card-actions class="py-3 px-1">
          <WithMenuIcon
            icon="mdi-dots-vertical"
            color="transparent"
            :elevation="0"
          >
            <template slot="menu-content">
              <div class="px-4">
                <h3 class="mt-2">{{ authenticatable.full_name }}</h3>
                <p class="text-caption mt-1">
                  {{ authenticatable.email }}
                </p>
              </div>
              <div v-for="(menu, index) in menus" :key="`menu_${index}`">
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  tile
                  text
                  :color="menu.color"
                  :disabled="menu.disabled"
                  @click="menu.handle"
                  >{{ menu.btnText }}</v-btn
                >
              </div>
            </template>
          </WithMenuIcon>
        </v-card-actions>
      </div>
      <v-avatar class="profile" size="150" :color="cardColor[1]" tile>
        <v-img v-if="authenticatable.file_path" :src="facePath"></v-img>
        <!-- <v-img
          v-else
          src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
        ></v-img> -->
        <span v-else class="text-h3">{{ initialChar }}</span>
      </v-avatar>
    </div>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Admin, User } from '~/types/ts-axios'
import { APP_STORAGE_URL } from '@/config'
import { getRandomColorPair } from '@/lib/util'
type Menu = {
  btnText: string
  handle: Function
  color: string
}

export default defineComponent({
  name: 'AuthenticatableCard',
  props: {
    authenticatable: {
      type: Object as PropType<User | Admin>,
      required: true,
    },
    menus: {
      type: Array as PropType<Menu[]>,
      default: () => [],
    },
    cardColor: {
      type: Array as PropType<string[]>,
      default: () => getRandomColorPair(),
    },
  },
  setup(props) {
    const facePath = computed(() => {
      return APP_STORAGE_URL + `/${props.authenticatable.file_path}`
    })
    const bgPath = computed(() => {
      return props.authenticatable.organization?.file_path
        ? APP_STORAGE_URL + `/${props.authenticatable.organization.file_path}`
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    })

    const initialChar = computed(
      () => props.authenticatable.family_name[0] || ''
    )
    return {
      bgPath,
      facePath,
      initialChar,
    }
  },
})
</script>
