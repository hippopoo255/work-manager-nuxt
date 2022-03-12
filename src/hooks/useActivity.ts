import { ref } from '@nuxtjs/composition-api'
import { Activity } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'

const useActivity = (authenticatable: 'admin' | 'user' = 'user') => {
  const { getRequest } = useAxios()
  const activities = ref<Activity[]>([])
  const page = ref(1)
  const hasMore = ref<boolean | number>(false)

  const fetchActivities = async (id: number) => {
    return await getRequest<{
      activities: Activity[]
      hasMore: boolean | number
    }>(
      requestUri.user.activity.replace('{id}', id) +
        `?page=${page.value}&authenticatable=${authenticatable}`
    ).then((res) => {
      activities.value = activities.value.concat(res.activities)
      hasMore.value = res.hasMore
      page.value++
      return activities
    })
  }

  return {
    fetchActivities,
    activities,
    hasMore,
  }
}

export default useActivity
