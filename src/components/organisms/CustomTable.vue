<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :footer-props="footerProps"
    class="elevation-1"
  ></v-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'
// import { useTable } from '~/hooks'

export default defineComponent({
  name: '',
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
  setup(_props) {
    // const { headers } = useTable(props.headersKey)
    // return { headers }
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
