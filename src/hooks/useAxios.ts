import { useContext, useRouter, computed } from '@nuxtjs/composition-api'
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import {
  httpClient,
  getErrorResponse,
  handleIfErrorStatus,
  RequestArgs,
  InputArg,
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
        router.push(app.localePath('forbidden'))
        throw err
      case NOTFOUND:
        status = {
          status: err.status,
          message: {
            notfound: err.data.message,
          },
        }
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
          message: err.data.message,
        })
        throw err
    }
  }

  const getRequest = async <T = string>({
    path,
    config = undefined,
    baseURL = API_STAGE_URL,
  }: RequestArgs) => {
    const response = await httpClient(baseURL)
      .get<T>(path, mergedConfig(config))
      .then((res: AxiosResponse<T>) => {
        return res
      })
      .catch((err: AxiosError) => getErrorResponse<T>(err))

    handleIfErrorStatus(response, defaultErrorHandler)

    return response.data
  }

  const postRequest = async <T, U>({
    path,
    data,
    config,
    baseURL = API_STAGE_URL,
  }: RequestArgs & InputArg<U>): Promise<T> => {
    const response = await httpClient(baseURL)
      .post(path, data, mergedConfig(config))
      .catch((err: AxiosError) => getErrorResponse<T>(err))

    handleIfErrorStatus(response, defaultErrorHandler)

    return response.data
  }

  const putRequest = async <T, U>({
    path,
    data,
    config,
    baseURL = API_STAGE_URL,
  }: RequestArgs & InputArg<U>): Promise<T> => {
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

    // return mergedConfig(config)

    return await postRequest<T, U>({ path, data, config, baseURL })
  }

  const deleteRequest = async <T = null>({
    path,
    config,
    baseURL = API_STAGE_URL,
  }: RequestArgs): Promise<T> => {
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
