import { useContext } from '@nuxtjs/composition-api'
import { Admin, AdminInputs } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'
import { toStrLabel } from '@/lib/util'

const useAdmin = () => {
  const { postRequest, getRequest } = useAxios()
  const { store, i18n } = useContext()

  const index = async () => {
    return await getRequest<Admin[]>(requestUri.admin.index).then((admins) => {
      return admins.map((admin: Admin) => {
        admin.email_verified_at = admin.email_verified_at
          ? toStrLabel(new Date(admin.email_verified_at))
          : ''
        admin.createdBy = admin.created_by?.full_name || ''
        admin.created_at = admin.created_at
          ? toStrLabel(new Date(admin.created_at))
          : ''
        return admin
      })
    })
  }

  const show = async (id: number) => {
    return await getRequest<Admin>(
      requestUri.admin.show.replace('{id}', String(id))
    )
  }

  const create = async (data: AdminInputs) => {
    return await postRequest<Admin, AdminInputs>(
      requestUri.admin.create,
      data
    ).then((user) => {
      store.dispatch('status/updateResponse', {
        status: 201,
        message: {
          success: i18n.t('alert.success.admin'),
        },
      })
      return user
    })
  }
  const update = (data: AdminInputs, id: number) => {
    return { data, id }
  }
  const save = async (data: AdminInputs, id?: number) => {
    if (id !== undefined) {
      return await update(data, id)
    } else {
      return await create(data)
    }
  }
  const destroy = () => {}

  return {
    index,
    show,
    save,
    destroy,
  }
}

export default useAdmin
