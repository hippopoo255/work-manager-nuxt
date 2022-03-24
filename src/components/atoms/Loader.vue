<template>
  <div class="root text-center" :class="absoluteClass">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  computed: {
    absoluteClass() {
      return {
        '--absolute': this.absolute,
      }
    },
  },
})
</script>
<style lang="scss">
.root {
  // position: relative;
  // height: 100%;
  &.--absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
