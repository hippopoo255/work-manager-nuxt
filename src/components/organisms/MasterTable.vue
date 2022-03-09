<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :footer-props="footerProps"
    class="elevation-1"
  >
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="handleEdit(item)"> mdi-pencil </v-icon>
      <v-icon small @click="handleDelete(item)"> mdi-delete </v-icon>
    </template>
    <template #[`item.color`]="{ item }">
      <span class="u-full-round" :class="bgColorClasss(item)"></span>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'
import { Department, MeetingPlace, Progress } from '@/types/ts-axios'

export default defineComponent({
  name: 'MasterTable',
  layout: 'default',
  props: {
    headers: {
      type: Array as PropType<DataTableHeader[]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    footerProps: {
      type: Object as PropType<object>,
      default: () => ({
        itemsPerPageOptions: [20, 40, 60],
      }),
    },
  },
  setup(_props, { emit }) {
    const handleEdit = (item: Progress | Department | MeetingPlace) => {
      emit('edit', item.id)
    }

    const handleDelete = (item: Progress | Department | MeetingPlace) => {
      emit('delete', item.id)
    }

    const bgColorClasss = (item: Progress & Department & MeetingPlace) => {
      if (item.color === undefined) {
        return []
      } else {
        return [`--${item.color}`]
      }
    }

    return {
      bgColorClasss,
      handleEdit,
      handleDelete,
    }
  },
})
</script>

<style lang="scss">
.v-data-table tbody > tr:nth-of-type(odd) {
  background: #eee;
}
.theme--dark {
  .v-data-table tbody > tr:nth-of-type(odd) {
    background: initial;
  }
}
</style>
