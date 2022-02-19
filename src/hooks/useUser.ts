import { useContext } from '@nuxtjs/composition-api'
import { UserInputs } from '~/types/inputs'
import { useAxios } from '@/hooks'
import { User } from '@/types/ts-axios'
import requestUri from '~/routes/requestUri'

const useUser = () => {
  const { postRequest } = useAxios()
  const { store } = useContext()
  const index = () => {}
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
