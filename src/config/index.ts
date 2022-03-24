export * from './sidebar'
export * from './statusCode'
export * from './cognito'
export * from './color'
export * from './tab'

export { default as requestUri } from './requestUri'

export const API_STAGE_URL = process.env.API_STAGE_URL || ''
export const API_DIRECT_URL = process.env.API_DIRECT_URL || ''
export const APP_STORAGE_URL = process.env.APP_STORAGE_URL || ''
export const NO_USER_IMAGE = '/no_user_image.svg'
