import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { defaultErrorHandler, httpClient } from './util'
import { API_STAGE_URL } from '@/config'

type Args = {
  path: string
  onError?: (err: AxiosResponse) => AxiosResponse | void
  config?: AxiosRequestConfig
  baseURL?: string
}

type ResourceArg<U> = {
  data: U
}

const getErrorResponse = <T = any>(err: AxiosError<T>) => {
  console.error('err:', err)
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

const handleIfErrorStatus = (
  response: AxiosResponse,
  onError?: (err: AxiosResponse) => AxiosResponse | void
) => {
  if (response.status >= 400) {
    // eslint-disable-next-line no-extra-boolean-cast
    !!onError ? onError(response) : defaultErrorHandler(response)
  }
}

export const getRequest = async <T = string>({
  path,
  onError = undefined,
  config = undefined,
  baseURL = API_STAGE_URL,
}: Args) => {
  const response = await httpClient(baseURL)
    .get<T>(path, { ...config })
    .then((res: AxiosResponse<T>) => {
      return res
    })
    .catch((err: AxiosError) => getErrorResponse<T>(err))

  handleIfErrorStatus(response, onError)

  return response.data
}

export const postRequest = async <T, U>({
  path,
  data,
  onError,
  config,
  baseURL = API_STAGE_URL,
}: Args & ResourceArg<U>): Promise<T> => {
  const response = await httpClient(baseURL)
    .post(path, data, { ...config })
    .catch((err: AxiosError) => getErrorResponse<T>(err))

  handleIfErrorStatus(response, onError)

  return response.data
}

export const putRequest = async <T, U>({
  path,
  data,
  onError,
  config,
  baseURL = API_STAGE_URL,
}: Args & ResourceArg<U>): Promise<T> => {
  const headers = {
    ...config?.headers,
    'X-HTTP-Method-Override': 'PUT',
  }
  if (config !== undefined) {
    config.headers = headers
  } else {
    config = {
      headers,
    }
  }

  return await postRequest<T, U>({ path, data, onError, config, baseURL })
}

export const deleteRequest = async <T = null>({
  path,
  config,
  onError,
  baseURL = API_STAGE_URL,
}: Args): Promise<T> => {
  const response = await httpClient(baseURL)
    .delete(path, config)
    .catch((err: AxiosError) => getErrorResponse<T>(err))

  handleIfErrorStatus(response, onError)

  return response.data
}
