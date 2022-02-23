<template>
  <v-container>
    <div class="text-center p-form">
      <h2 class="c-page-title">{{ username }}</h2>
      <SignupForm />
    </div>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'
import { decode64 } from '@/lib/util'
export default defineComponent({
  name: 'Signup',
  layout: 'GuestLayout',
  setup() {
    const route = useRoute()
    const username = ref<string>('')
    onMounted(() => {
      const r = route.value
      const family_name = decode64(String(r.query.family_name || ''))
      const given_name = decode64(String(r.query.given_name || ''))
      username.value = `${family_name} ${given_name}さん`
    })
    return {
      username,
    }
  },
})
</script>
