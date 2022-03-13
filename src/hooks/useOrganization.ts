import { useContext, ref } from '@nuxtjs/composition-api'
import { Organization, OrganizationInputs, Prefecture } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'

const useOrganization = () => {
  const { putRequest, getRequest } = useAxios()
  const { store, i18n } = useContext()
  const organization = ref<Organization>()
  const prefectures = ref<Prefecture[]>([])

  const fetchPrefecture = async () => {
    await getRequest<Prefecture[]>(requestUri.prefecture.index).then((res) => {
      prefectures.value = res
    })
  }

  const update = async (data: OrganizationInputs, id: number) => {
    return await putRequest<Organization, OrganizationInputs>(
      requestUri.organization.update.replace('{id}', id),
      data
    ).then((organization) => {
      store.dispatch('status/updateResponse', {
        status: 200,
        message: {
          success: i18n.t('alert.success.organization'),
        },
      })
      return organization
    })
  }

  const save = async (data: OrganizationInputs, id?: number) => {
    if (id !== undefined) {
      return await update(data, id)
    }
  }

  return {
    organization,
    save,
    fetchPrefecture,
    prefectures,
  }
}

export default useOrganization
