import { useContext } from '@nuxtjs/composition-api'
import { Admin, AdminInputs } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'
import { toStrLabel } from '@/lib/util'

const useAdmin = () => {
  const { postRequest, getRequest } = useAxios()
  const { store, i18n } = useContext()
  const index = async () => {
    return await getRequest<Admin[]>({ path: requestUri.admin.index }).then(
      (admins) => {
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
      }
    )
  }
  const show = () => {}

  const create = async (data: AdminInputs) => {
    const path = requestUri.admin.create
    return await postRequest<Admin, AdminInputs>({ path, data }).then(
      (user) => {
        store.dispatch('status/updateResponse', {
          status: 201,
          message: {
            success: i18n.t('alert.success.admin'),
          },
        })
        return user
      }
    )
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
