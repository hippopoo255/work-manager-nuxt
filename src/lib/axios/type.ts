import { AxiosRequestConfig } from 'axios'
import { Response } from '@/store/status'

export type RequestArgs = {
  path: string
  config?: AxiosRequestConfig
  baseURL?: string
}

export type InputArg<U> = {
  data: U
}

export type ResponseErrorBody = {
  message: string
  errors?: Response
}
