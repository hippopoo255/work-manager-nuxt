import { NuxtI18nInstance } from 'nuxt-i18n'
import {
  departmentTableHeaders,
  meetingRoomTableHeaders,
  progressTableHeaders,
} from '@/config/table'

export const masterTableHeaders = (
  i18n: NuxtI18nInstance,
  modelName: 'department' | 'meeting_room' | 'progress'
) => {
  const headersList = {
    department: departmentTableHeaders,
    meeting_room: meetingRoomTableHeaders,
    progress: progressTableHeaders,
  }
  return headersList[modelName].index(i18n)
}
