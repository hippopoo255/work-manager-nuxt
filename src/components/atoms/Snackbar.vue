<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :color="color" multi-line>
      {{ message }}
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="clear"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Snackbar',
  setup() {
    const { store } = useContext()
    const color = ref('error')

    const statusCode = computed(() => store.getters['status/status'])
    const snackbar = computed(() => !!statusCode.value)
    const message = computed(() => {
      const messages = store.getters['status/message']
      if (messages) {
        return Object.keys(messages)
          .map((key) => {
            return typeof messages[key] === 'string'
              ? messages[key]
              : messages[key].join('\n')
          })
          .join('\n')
      } else {
        return ''
      }
    })

    watch(
      () => statusCode.value,
      (code) => {
        if (code) {
          color.value = code < 400 ? 'success' : 'error'
        }
        setTimeout(() => {
          clear()
        }, 6000)
      },
      { immediate: true }
    )

    const clear = () => {
      store.dispatch('status/clearResponse')
    }

    return {
      clear,
      color,
      snackbar,
      statusCode,
      message,
    }
  },
})
</script>
<style scoped>
* {
  text-transform: none !important;
}
</style>
