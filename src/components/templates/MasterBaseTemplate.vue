<template>
  <div>
    <h2 class="c-page-title text-center">{{ title }}</h2>
    <Loader v-if="loading" />
    <div v-else style="position: relative">
      <MasterTable
        :headers="headers"
        :items="list"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      <div class="u-text-right u-mt-3">
        <MasterFormModal
          :model="model"
          :item="single"
          :title="title"
          @close="clearCurrentId"
          @saved="handleAfterSaved"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

import { useMaster } from '@/hooks'
import { Master } from '@/hooks/useMaster'

export default defineComponent({
  name: 'MasterBaseTemplate',
  setup() {
    const {
      index,
      loading,
      model,
      title,
      list,
      single,
      currentId,
      updateList,
      headers,
      destroy,
    } = useMaster()
    const { store, i18n } = useContext()
    const isSignin = computed(() => store.getters['admin/isSignin'])

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await index()
        }
      },
      { immediate: true }
    )

    const handleAfterSaved = (item: Master[typeof model.value]) => {
      updateList(item, !!currentId.value)
      clearCurrentId()
    }

    const handleDelete = async (id: number) => {
      if (confirm(String(i18n.t('confirm')))) {
        await destroy(id)
      }
    }

    const handleEdit = (id: number) => {
      currentId.value = id
    }

    const clearCurrentId = () => {
      currentId.value = 0
    }

    return {
      headers,
      list,
      single,
      loading,
      model,
      handleAfterSaved,
      clearCurrentId,
      handleDelete,
      handleEdit,
      title,
    }
  },
})
</script>
