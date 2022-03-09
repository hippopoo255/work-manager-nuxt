import { useContext, useRouter, computed } from '@nuxtjs/composition-api'
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import {
  httpClient,
  getErrorResponse,
  RequestOptions,
  ResponseErrorBody,
} from '@/lib/axios'

import {
  UNAUTHORIZED,
  FORBIDDEN,
  NOTFOUND,
  UNPROCESSABLE,
  API_STAGE_URL,
} from '@/config'

const useAxios = () => {
  const { app, store } = useContext()
  const router = useRouter()
  const jwt = computed(() => store.getters['admin/jwt'])

  const mergedConfig = (config?: AxiosRequestConfig) => {
    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: jwt.value,
      },
    }
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

  const defaultErrorHandler = (err: AxiosResponse<ResponseErrorBody>) => {
    let status
    switch (err.status) {
      case UNAUTHORIZED:
        status = {
          status: err.status,
          message: {
            unauthorized: err.data.message,
          },
        }
        store.dispatch('status/updateResponse', status)
        router.push(app.localePath('signin'))
        throw err
      case FORBIDDEN:
        status = {
          status: err.status,
          message: {
            forbidden: err.data.message,
          },
        }
        store.dispatch('status/updateResponse', status)
        router.push(app.localePath('forbidden'))
        throw err
      case NOTFOUND:
        status = {
          status: err.status,
          message: {
            notfound: err.data.message,
          },
        }
        store.dispatch('status/updateResponse', status)
        router.push(app.localePath('not-found'))
        throw err
      case UNPROCESSABLE:
        store.dispatch('status/updateResponse', {
          status: err.status,
          message: err.data.errors || {
            invalid: err.data.message,
          },
        })
        throw err
      default:
        store.dispatch('status/updateResponse', {
          status: err.status,
          message: {
            server: err.data.message,
          },
        })
        throw err
    }
  }

  const getRequest = async <T = string>(
    path: string,
    { config = undefined, baseURL = API_STAGE_URL }: RequestOptions = {}
  ) => {
    const response = await httpClient(baseURL)
      .get<T>(path, mergedConfig(config))
      .then((res: AxiosResponse<T>) => {
        return res
      })
      .catch((err: AxiosError) => getErrorResponse<T>(err))

    handleIfErrorStatus(response, defaultErrorHandler)

    return response.data
  }

  const postRequest = async <T, U>(
    path: string,
    data: U,
    { config, baseURL = API_STAGE_URL }: RequestOptions = {}
  ): Promise<T> => {
    const response = await httpClient(baseURL)
      .post(path, data, mergedConfig(config))
      .catch((err: AxiosError) => getErrorResponse<T>(err))

    handleIfErrorStatus(response, defaultErrorHandler)

    return response.data
  }

  const putRequest = async <T, U>(
    path: string,
    data: U,
    { config, baseURL = API_STAGE_URL }: RequestOptions = {}
  ): Promise<T> => {
    if (config !== undefined) {
      const headers = {
        ...config.headers,
        'X-HTTP-Method-Override': 'PUT',
      }
      config.headers = headers
    } else {
      config = {
        headers: { 'X-HTTP-Method-Override': 'PUT' },
      }
    }

    return await postRequest<T, U>(path, data, { config, baseURL })
  }

  const deleteRequest = async <T = null>(
    path: string,
    { config, baseURL = API_STAGE_URL }: RequestOptions = {}
  ): Promise<T> => {
    const response = await httpClient(baseURL)
      .delete(path, mergedConfig(config))
      .catch((err: AxiosError) => getErrorResponse<T>(err))

    handleIfErrorStatus(response, defaultErrorHandler)

    return response.data
  }

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
  }
}

export default useAxios
