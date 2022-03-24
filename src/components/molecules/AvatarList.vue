<template>
  <ul class="p-avatar-list">
    <li
      v-for="(user, index) in users"
      :key="index"
      class="p-avatar-list__item"
      :class="nthClass(index)"
    >
      <nuxt-link :to="localePath(`/user/${user.id}`)">{{
        user.full_name
      }}</nuxt-link>
      <!-- <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn icon x-large v-on="on" v-bind="attrs">
            <v-avatar color="orange" size="36">
              <v-img v-if="user.file_path" :src="facePath"></v-img>
              <span v-else class="white--text">{{ initials(index) }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <span>{{ user.full_name }}</span>
      </v-tooltip> -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { User } from '@/types/ts-axios'
import { faceUrl } from '@/lib/util'

export default defineComponent({
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  setup(props) {
    const initials = (index: number) => props.users[index].family_name[0] || ''
    const nthClass = (index: number) => ({
      [`--item-${index}`]: true,
    })
    return {
      faceUrl,
      initials,
      nthClass,
    }
  },
})
</script>

<style scoped></style>
