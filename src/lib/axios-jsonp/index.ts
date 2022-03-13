/* eslint-disable no-extra-boolean-cast */
import { ZIP_ADDRESS_API_URL } from './util'
import { OrganizationInputs } from '@/types/ts-axios'
import { httpClient } from '@/lib/axios'

export type Address = {
  pref: string
  city: string
  town: string
  [k: string]: string
}

const noData = {
  pref: '',
  city: '',
  town: '',
} as Address

export default async function fetchAddressByPostalCode(
  postalCode: OrganizationInputs['postal_code']
) {
  if (!!postalCode) {
    const address = await httpClient(ZIP_ADDRESS_API_URL)
      .get(`/?zipcode=${postalCode}`)
      .then((res) => {
        const d = res.data
        return d === undefined ? noData : d
      })
      .catch(() => noData)
    return address
  }
  return noData
}
