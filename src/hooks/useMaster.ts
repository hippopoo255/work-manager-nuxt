import {
  useRoute,
  useContext,
  computed,
  ref,
  ComputedRef,
} from '@nuxtjs/composition-api'
import { useAxios } from '@/hooks'
import { requestUri, OK, CREATED } from '@/config'
import {
  Department,
  MeetingPlace,
  Progress,
  DepartmentInputs,
  MeetingPlaceInputs,
  ProgressInputs,
} from '~/types/ts-axios'
import { masterTableHeaders } from '@/config/table'
import { toStrLabel } from '@/lib/util'

export type Master = {
  department: Department
  meeting_room: MeetingPlace
  progress: Progress
}

export type Inputs = DepartmentInputs | MeetingPlaceInputs | ProgressInputs

const useMaster = () => {
  const route = useRoute()
  const { i18n, store } = useContext()
  const { getRequest, postRequest, putRequest, deleteRequest } = useAxios()
  const loading = ref(true)

  const model: ComputedRef<keyof Master> = computed(() => {
    const routePath = route.value.path
    if (routePath) {
      const perSlashArray = routePath.split('/')
      return String(perSlashArray.pop()) as keyof Master
    }
    return 'department'
  })

  const title = computed(() => i18n.t(`page.title.master.${model.value}`))
  const headers = computed(() => masterTableHeaders(i18n, model.value))

  const list = ref<Master[typeof model.value][]>([])
  const currentId = ref(0)
  const single = computed(() =>
    list.value.find((item) => item.id === currentId.value)
  )

  const index = async () => {
    if (requestUri[model.value]) {
      loading.value = true
      await getRequest<Master[typeof model.value][]>(
        requestUri[model.value].index
      )
        .then((res) => {
          list.value = res.map((item) => {
            item.created_at = item.created_at
              ? toStrLabel(new Date(item.created_at))
              : ''
            return item
          })
        })
        .finally(() => {
          loading.value = false
        })
    }
  }

  const create = async (inputs: Inputs) => {
    const item = await postRequest<Master[typeof model.value], Inputs>(
      requestUri[model.value].create,
      inputs
    ).then((res) => {
      store.dispatch('status/updateResponse', {
        status: CREATED,
        message: { success: i18n.t('alert.success.save') },
      })
      return res
    })
    return item
  }

  const update = async (inputs: Inputs, id: number) => {
    const item = await putRequest<Master[typeof model.value], Inputs>(
      requestUri[model.value].update.replace('{id}', id),
      inputs
    ).then((res) => {
      store.dispatch('status/updateResponse', {
        status: OK,
        message: { success: i18n.t('alert.success.save') },
      })
      return res
    })
    return item
  }

  const save = async (inputs: Inputs, id?: number) => {
    if (id === undefined) {
      return await create(inputs)
    } else {
      return await update(inputs, id)
    }
  }

  const destroy = async (id: number) => {
    await deleteRequest<''>(
      requestUri[model.value].destroy.replace('{id}', id)
    ).then(() => {
      store.dispatch('status/updateResponse', {
        status: 204,
        message: { success: i18n.t('alert.success.delete') },
      })
      const index = list.value.findIndex((d) => d.id === id)
      list.value.splice(index, 1)
    })
  }

  const updateList = (
    item: Master[typeof model.value],
    isEdit: boolean = false
  ) => {
    if (isEdit) {
      const index = list.value.findIndex((d) => d.id === item.id)
      list.value.splice(index, 1, {
        ...item,
        created_at: item.created_at
          ? toStrLabel(new Date(item.created_at))
          : '',
      })
    } else {
      list.value.push({
        ...item,
        created_at: item.created_at
          ? toStrLabel(new Date(item.created_at))
          : '',
      })
    }
  }

  return {
    updateList,
    currentId,
    destroy,
    headers,
    index,
    i18n,
    list,
    loading,
    model,
    save,
    single,
    title,
  }
}

export default useMaster
