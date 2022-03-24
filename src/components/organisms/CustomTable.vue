<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :footer-props="footerProps"
    class="elevation-1"
  >
    <template #[`item.simple_reporter`]="{ item }">
      <nuxt-link :to="localePath(`/user/${item.created_by.id}`)">{{
        userLinkText(item)
      }}</nuxt-link
      ><span class="unit">{{ elseUnitText(item) }}</span>
    </template>
    <template #[`item.chat_message.created_by.full_name`]="{ item }">
      <nuxt-link :to="localePath(`/user/${item.chat_message.created_by.id}`)">{{
        item.chat_message.created_by.full_name
      }}</nuxt-link>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-tooltip left>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            color="info"
            v-on="on"
            @click="handleEdit(item)"
          >
            <v-icon> mdi-note-search-outline </v-icon>
          </v-btn>
        </template>
        <span>{{ '詳細を見る' }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'

export default defineComponent({
  name: 'CustomTable',
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
    const handleEdit = (item: any) => {
      emit('edit', item.id)
    }

    const userLinkText = (item: any) => {
      const split = item.simple_reporter.split(' 他')
      return split[0]
    }

    const elseUnitText = (item: any) => {
      const split = item.simple_reporter.split(' 他')
      return split.length === 2 ? ` 他${split[1]}` : ''
    }

    return { elseUnitText, handleEdit, userLinkText }
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
  .unit {
    color: #f5f5f5;
  }
}

.theme--light {
  .unit {
    color: #aaaaaa;
  }
}

.unit {
  font-size: 12px;
}
</style>
