<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template #activator="{ on }">
      <v-btn
        small
        :outlined="outlined"
        :color="color"
        :elevation="elevation"
        fab
        v-on="on"
        ><v-icon color="white">{{ icon }}</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto">
          <slot name="menu-content" />
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'WithMenuIcon',
  props: {
    icon: { type: String as PropType<string>, default: 'mdi-menu' },
    outlined: { type: Boolean as PropType<boolean>, default: false },
    elevation: { type: Number as PropType<number>, default: 2 },
    color: { type: String as PropType<string>, default: 'pink' },
  },
  setup(_props) {},
})
</script>
