export * from './sidebar'
export * from './statusCode'
export { default as requestUri } from './requestUri'

export const API_STAGE_URL = process.env.API_STAGE_URL || ''
export const API_DIRECT_URL = process.env.API_DIRECT_URL || ''
