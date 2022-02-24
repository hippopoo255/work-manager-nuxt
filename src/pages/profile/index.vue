<template>
  <div class="text-center p-form">
    <h2 class="c-page-title">{{ $t('page.title.profile') }}</h2>
    <ProfileForm :admin="me" :title="$t('page.title.profile')" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProfileIndex',
  setup() {
    const { store } = useContext()
    const me = computed(() => store.getters['admin/currentAdmin'])
    return { me }
  },
})
</script>
