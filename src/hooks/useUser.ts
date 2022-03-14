import { useContext } from '@nuxtjs/composition-api'
import { User, UserInputs } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'
import { toStrLabel } from '@/lib/util'
const useUser = () => {
  const { postRequest, getRequest, putRequest } = useAxios()
  const { store, i18n } = useContext()

  const index = async () => {
    return await getRequest<User[]>(requestUri.user.index).then((users) => {
      return users.map((u: User) => {
        u.email_verified_at = u.email_verified_at
          ? toStrLabel(new Date(u.email_verified_at))
          : ''
        u.createdBy = u.created_by?.full_name || ''
        u.created_at = u.created_at ? toStrLabel(new Date(u.created_at)) : ''
        return u
      })
    })
  }

  const show = async (id: number) => {
    return await getRequest<User>(
      requestUri.user.show.replace('{id}', String(id))
    )
  }

  const create = async (data: UserInputs) => {
    return await postRequest<User, UserInputs>(
      requestUri.user.create,
      data
    ).then((user) => {
      store.dispatch('status/updateResponse', {
        status: 201,
        message: {
          success: i18n.t('alert.success.user'),
        },
      })
      return user
    })
  }

  const update = async (data: UserInputs, id: number) => {
    return await putRequest<User, UserInputs>(
      requestUri.user.update.replace('{id}', id),
      data
    ).then((user) => {
      store.dispatch('status/updateResponse', {
        status: 200,
        message: {
          success: i18n.t('alert.success.user'),
        },
      })
      return user
    })
  }

  const save = async (data: UserInputs, id?: number) => {
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

export default useUser
