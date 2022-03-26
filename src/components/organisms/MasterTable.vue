<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :footer-props="footerProps"
    class="elevation-1"
  >
    <template #[`item.actions`]="{ item }">
      <div v-if="item.is_default" class="d-flex align-center justify-center">
        <span class="text-caption grey--text">{{
          $t('status.isDefault')
        }}</span>
      </div>
      <div v-else class="d-flex align-center justify-center">
        <v-tooltip left>
          <template #activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="handleEdit(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span class="text-caption">{{ $t('tooltip.edit') }}</span>
        </v-tooltip>
        <v-tooltip left>
          <template #activator="{ on, attrs }">
            <v-icon
              small
              :color="colorByCount(item)"
              v-bind="attrs"
              v-on="on"
              @click="handleDelete(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span class="text-caption">{{
            hasChildren(item)
              ? $t('tooltip.trash.hasChildren')
              : $t('submit.delete')
          }}</span>
        </v-tooltip>
      </div>
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

    const handleDelete = (item: Progress & Department & MeetingPlace) => {
      if (hasChildren(item)) {
        return false
      }
      emit('delete', item.id)
    }

    const bgColorClasss = (item: Progress & Department & MeetingPlace) => {
      if (item.color === undefined) {
        return []
      } else {
        return [`--${item.color}`]
      }
    }
    const hasChildren = (item: Progress & Department & MeetingPlace) =>
      !!(item.task_count || item.member_count)

    const colorByCount = (item: Progress & Department & MeetingPlace) => {
      return hasChildren(item) ? 'grey lighten-1' : ''
    }

    return {
      bgColorClasss,
      colorByCount,
      hasChildren,
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
