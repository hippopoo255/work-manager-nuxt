<template>
  <v-tabs centered show-arrows>
    <!-- <v-tabs-slider></v-tabs-slider> -->

    <TabItem v-for="tab in tabs" :key="tab.id" :tab="tab" @click="tabClick" />
  </v-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type TabItem = {
  id?: number
  text: string
}
type Tabs = TabItem[]

export default defineComponent({
  name: 'TabList',
  props: {
    tabs: { type: Array as PropType<Tabs>, default: () => [] },
    tabClick: {
      type: Function as PropType<Function>,
      required: true,
    },
  },
  setup(_props) {
    // const handleClick = (id?: number) => {
    //   props.tabClick(id)
    // }
    // return { handleClick }
  },
})
</script>

<style scoped></style>
