import { useContext } from '@nuxtjs/composition-api'
import { User, UserInputs } from '~/types/ts-axios'
import { useAxios } from '@/hooks'
import { requestUri } from '@/config'
import { toStrLabel } from '@/lib/util'
const useUser = () => {
  const { postRequest, getRequest } = useAxios()
  const { store } = useContext()
  const index = async () => {
    return await getRequest<User[]>({ path: requestUri.user.index }).then(
      (users) => {
        return users.map((u: User) => {
          u.email_verified_at = u.email_verified_at
            ? toStrLabel(new Date(u.email_verified_at))
            : ''
          u.createdBy = u.created_by?.full_name || ''
          u.created_at = u.created_at ? toStrLabel(new Date(u.created_at)) : ''
          return u
        })
      }
    )
  }
  const show = () => {}

  const create = async (data: UserInputs) => {
    const path = requestUri.user.create
    return await postRequest<User, UserInputs>({ path, data }).then((user) => {
      store.dispatch('status/updateResponse', {
        status: 201,
        message: {
          success: 'ユーザー登録が完了しました',
        },
      })
      return user
    })
  }
  const update = (data: UserInputs, id: number) => {
    return { data, id }
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
