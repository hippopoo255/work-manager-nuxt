import axios, {
  AxiosError,
  // AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
} from 'axios'
import { API_STAGE_URL } from '@/config'

export const httpClient = (baseURL: string = API_STAGE_URL): AxiosInstance => {
  return axios.create({
    baseURL,
  })
}

export const getErrorResponse = <T = any>(err: AxiosError<T>) => {
  if (err.response === undefined) {
    return {
      status: 500,
      data: {
        message: {
          network: ['Network or Server Error'],
        },
      } as unknown,
    } as AxiosResponse<T>
  }
  return err.response
}

export const defaultErrorHandler = (err: AxiosResponse) => {
  throw err
}

export const handleIfErrorStatus = (
  response: AxiosResponse,
  onError?: (err: AxiosResponse) => AxiosResponse | void
) => {
  if (response.status >= 400) {
    // eslint-disable-next-line no-extra-boolean-cast
    !!onError ? onError(response) : defaultErrorHandler(response)
  }
}
