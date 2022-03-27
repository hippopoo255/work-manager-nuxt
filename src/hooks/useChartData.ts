import { ref, Ref, useContext } from '@nuxtjs/composition-api'
import { requestUri } from '@/config'
import { useAxios } from '@/hooks'
import {
  chartColor,
  dataCategories,
  path,
  ChartData,
  DataCategory,
  ChartCategoryKey,
  DataCategories,
  ChartApiResponse,
} from '~/lib/chart-js'
import { Activity } from '~/types/ts-axios'
import { symbolByPath } from '@/lib/util'

const useChartData = () => {
  const { getRequest } = useAxios()
  const { i18n } = useContext()

  const fetchActivityList = async (): Promise<void> => {
    const res = await getRequest<Activity[]>(requestUri.activity.index)
    activities.value = res
  }

  const fetchChartData = async (
    dataCategoryName: keyof DataCategories,
    queryAddition?: string
  ): Promise<void> => {
    // eslint-disable-next-line no-extra-boolean-cast
    const lastPath = !!queryAddition
      ? path[dataCategoryName] +
        symbolByPath(path[dataCategoryName]) +
        queryAddition
      : path[dataCategoryName]
    const res = await getRequest<ChartApiResponse>(lastPath)
    const ref = chartRefs.value
    const dCategories = dataCategories(i18n)
    ref[dataCategoryName] = {
      // ['2022-01', '2022-02', '2022-03']
      labels: res.labels,
      datasets: dCategories[dataCategoryName].map(
        (dataCategory: DataCategory) => ({
          label: dataCategory.label,
          // [100,200,300]
          data: res.data[dataCategory.name],
          backgroundColor: chartColor[dataCategoryName].backgroundColor,
          borderColor: chartColor[dataCategoryName].borderColor,
          fill: true,
        })
      ),
    }
  }

  const activities = ref<Activity[]>([])

  const blog = ref<ChartData | null>(null)

  const blogPerUser = ref<ChartData | null>(null)

  const chat = ref<ChartData | null>(null)

  const chatPerUser = ref<ChartData | null>(null)

  const chatPerPost = ref<ChartData | null>(null)

  const minutes = ref<ChartData | null>(null)

  const chartRefs = ref<{ [k in ChartCategoryKey]: Ref<ChartData | null> }>({
    blog,
    blogPerUser,
    chat,
    chatPerUser,
    chatPerPost,
    minutes,
  })

  return {
    activities,
    blog,
    blogPerUser,
    chat,
    chatPerUser,
    chatPerPost,
    fetchActivityList,
    fetchChartData,
    minutes,
  }
}

export default useChartData
