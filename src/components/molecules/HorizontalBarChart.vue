<script>
import Vue from 'vue'
// eslint-disable-next-line import/named
import { HorizontalBar } from 'vue-chartjs'
import ChartMixin from '@/mixins/ChartMixin'

export default Vue.extend({
  extends: HorizontalBar,
  mixins: [ChartMixin],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
</script>
