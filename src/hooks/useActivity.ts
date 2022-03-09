import { ref } from '@nuxtjs/composition-api'
import { Activity } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'

const useActivity = (authenticatable: 'admin' | 'user' = 'admin') => {
  const { getRequest } = useAxios()
  const activities = ref<Activity[]>([])

  const fetchActivities = async (id: number) => {
    return await getRequest<Activity[]>(
      requestUri[authenticatable].activity.replace('{id}', id)
    ).then((res) => {
      activities.value = res
      return activities
    })
  }

  return {
    fetchActivities,
    activities,
  }
}

export default useActivity
