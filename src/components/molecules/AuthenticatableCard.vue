<template>
  <Loader v-if="authenticatable === null" />
  <v-card v-else class="text-left p-authenticatable-card">
    <div
      class="p-authenticatable-card__overlay"
      :class="modifierByDepartmentColor"
    >
      <div class="p-authenticatable-card__avatar">
        <v-avatar size="100" class="p-authenticatable-card__avatar-inner">
          <v-img v-if="authenticatable.file_path" :src="facePath"></v-img>
          <span v-else class="text-h4">{{ initialChar }}</span>
        </v-avatar>
      </div>
      <div class="p-authenticatable-card__overlay-main">
        <v-card-title class="text-h5">{{
          authenticatable.full_name
        }}</v-card-title>
        <v-card-subtitle class="pr-0">{{
          authenticatable.department.name
        }}</v-card-subtitle>
      </div>
      <v-card-actions class="p-authenticatable-card__action pa-0">
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
    <!-- カードの下部分 -->
    <div class="p-authenticatable-card__bottom">
      <slot name="authenticatable-content" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Admin, User } from '~/types/ts-axios'
import { getRandomColorPair, faceUrl } from '@/lib/util'
type Menu = {
  btnText: string
  handle: Function
  color: string
}

export default defineComponent({
  name: 'AuthenticatableCard',
  props: {
    authenticatable: {
      type: [Object, null] as PropType<User | Admin | null>,
      default: null,
    },
    activityCount: {
      type: Number as PropType<number>,
      default: 0,
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
    const facePath = computed(() =>
      props.authenticatable && props.authenticatable.file_path
        ? faceUrl(props.authenticatable.file_path)
        : ''
    )
    const bgPath = computed(() =>
      props.authenticatable && props.authenticatable.organization?.file_path
        ? faceUrl(props.authenticatable.organization?.file_path)
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    )

    const initialChar = computed(() =>
      props.authenticatable ? props.authenticatable.family_name[0] || '' : ''
    )

    const modifierByDepartmentColor = computed(() => {
      if (props.authenticatable && props.authenticatable.department) {
        return [`--${props.authenticatable.department.color}`]
      } else {
        return []
      }
    })
    return {
      bgPath,
      facePath,
      initialChar,
      modifierByDepartmentColor,
    }
  },
})
</script>
