import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { API_STAGE_URL } from '@/config'

export const defaultErrorHandler = (err: AxiosResponse) => {
  // const router = useRouter()
  console.error(err)
  switch (err.status) {
    case 401:
      // router.push({ name: 'login' })
      throw err
    case 403:
      // router.push({ name: 'forbidden' })
      throw err
    case 404:
      // router.push({ name: 'not-found' })
      throw err
    default:
      throw err
  }
}

export const httpClient = (baseURL: string = API_STAGE_URL): AxiosInstance =>
  axios.create({
    baseURL,
  })
