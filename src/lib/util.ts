import { APP_STORAGE_URL } from '~/config'
export const encode64 = (str: string) => Buffer.from(str).toString('base64')
export const decode64 = (str: string) => Buffer.from(str, 'base64').toString()

export function toStrData(date: Date): string {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hour = `0${date.getHours()}`.slice(-2)
  const minute = `0${date.getMinutes()}`.slice(-2)
  return `${year}/${month}/${day} ${hour}:${minute}`
}

export function toStrLabel(date: Date, timeless: boolean = false): string {
  let year: string = ''
  if (date.getFullYear() !== new Date().getFullYear()) {
    year = `${date.getFullYear()}/`.slice(-3)
  }
  const month = `${date.getMonth() + 1}/`
  const day = `${date.getDate()}`
  // const dayOfWeek = date.getDay() // 曜日(数値)
  // const dayOfWeekStr = t.date.dayOfStrList[dayOfWeek] // 曜日(日本語表記)
  if (timeless) {
    // return t.date.short(year, month, day, dayOfWeekStr)
    return `${year}${month}${day}`
  }
  const hour = `${date.getHours()}:`

  const minute = `0${date.getMinutes()}`.slice(-2)

  return `${year}${month}${day} ${hour}${minute}`
}

export function toStrFormalLabel(date: Date): string {
  const year = `${date.getFullYear()}年`
  const month = `${date.getMonth() + 1}月`
  const day = `${date.getDate()}日`
  const dayOfWeek = date.getDay() // 曜日(数値)
  const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek] // 曜日(日本語表記)
  const hour = `${date.getHours()}:`
  const minute = `0${date.getMinutes()}`.slice(-2)
  return `${year}${month}${day}(${dayOfWeekStr}) ${hour}${minute}`
}

export function postTiming(createDate: Date) {
  const now = new Date()
  const diff = now.getTime() - createDate.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)

  if (minutes < 1) {
    return 'たった今'
  } else if (hours < 1) {
    return `約${minutes}分前`
  } else if (days < 1) {
    return `約${hours}時間前`
  } else if (now.getFullYear() > createDate.getFullYear()) {
    const year = createDate.getFullYear()
    const month = createDate.getMonth() + 1
    const date = createDate.getDate()
    return `${year}/${month}/${date}`
  } else {
    const month = createDate.getMonth() + 1
    const date = createDate.getDate()
    const hour = createDate.getHours()
    const minute = `0${createDate.getMinutes()}`.slice(-2)
    return `${month}/${date} ${hour}:${minute}`
  }
}

export const faceUrl = (path: string) => APP_STORAGE_URL + `/${path}`

export const symbolByPath = (path: string) => (path.match(/\?/) ? '&' : '?')
