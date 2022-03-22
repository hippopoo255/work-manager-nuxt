import Vue from 'vue'
import { chartColor, options } from '@/lib/chart-js'

export default Vue.extend({
  props: {
    chartData: {
      type: Object,
      default: () => ({
        labels: ['10月', '11月', '12月'],
        datasets: [
          {
            label: '報告',
            data: [100, 150, 300],
            fill: true,
            backgroundColor: chartColor.blog.backgroundColor,
            borderColor: chartColor.blog.borderColor,
          },
          {
            label: '投稿数',
            data: [40, 22, 320],
            fill: true,
            backgroundColor: chartColor.chat.backgroundColor,
            borderColor: chartColor.chat.borderColor,
          },
        ],
      }),
    },
    options: {
      type: Object,
      default: () => ({
        ...options,
      }),
    },
  },
})
