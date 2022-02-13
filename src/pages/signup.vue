<template>
  <v-container>
    <div class="p-form">
      <SignupForm />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Signup',
  layout: 'GuestLayout',
  setup() {},
})
</script>

<style scoped></style>
