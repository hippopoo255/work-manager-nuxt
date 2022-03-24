<script>
import Vue from 'vue'
// eslint-disable-next-line import/named
import { HorizontalBar } from 'vue-chartjs'
import { options } from '@/lib/chart-js'
import ChartMixin from '@/mixins/ChartMixin'

export default Vue.extend({
  extends: HorizontalBar,
  mixins: [ChartMixin],
  props: {
    options: {
      type: Object,
      default: () => ({
        ...options.horizontalBar(),
      }),
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
</script>
