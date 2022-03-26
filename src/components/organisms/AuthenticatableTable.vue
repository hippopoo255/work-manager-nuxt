<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :footer-props="footerProps"
    class="elevation-1"
  >
    <template #[`item.full_name`]="{ item }">
      <nuxt-link
        :to="localePath({ name: `${model}-id`, params: { id: item.id } })"
      >
        {{ item.full_name }}
      </nuxt-link>
    </template>
    <template #[`item.department.name`]="{ item }">
      <v-list-item-content>
        <v-list-item-subtitle
          class="text--sub"
          v-html="item.department ? item.department.department_code : ''"
        ></v-list-item-subtitle>
        <v-list-item-title
          v-html="item.department ? item.department.name : ''"
        ></v-list-item-title>
      </v-list-item-content>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="handleEdit(item)"> mdi-pencil </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'
import { Admin, User } from '@/types/ts-axios'

export default defineComponent({
  props: {
    headers: {
      type: Array as PropType<DataTableHeader[]>,
      required: true,
    },
    model: {
      type: String as PropType<string>,
      default: 'user',
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
    const handleEdit = (item: Admin | User) => {
      emit('edit', item.id)
    }

    const handleDelete = (item: Admin | User) => {
      emit('delete', item.id)
    }

    return {
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
.v-list-item__title {
  font-size: 0.875rem;
}
.v-list-item__subtitle {
  color: gray;
  margin-right: 4px;
  min-height: 16px;
}
</style>
