export type IconItem = {
  name: string
  icon: string
  [k: string]: string | number | boolean
}
export const masters = [
  {
    name: '会議室',
    icon: 'mdi-chair-rolling',
    to: 'master-meeting_room',
    resource: 'meeting_room',
  },
  {
    name: '部署',
    icon: 'mdi-office-building-outline',
    to: 'master-department',
    resource: 'department',
  },
  {
    name: '進捗度',
    icon: 'mdi-checkbox-marked-circle-outline',
    to: 'master-progress',
    resource: 'progress',
  },
]
