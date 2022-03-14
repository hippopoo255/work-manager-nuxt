// import { DataTableHeader } from 'vuetify'
import { NuxtI18nInstance } from 'nuxt-i18n'
export const userTableHeaders = {
  index: (i18n: NuxtI18nInstance) => {
    const t = i18n.t('layout.table.header.user.index')
    const actions = i18n.t('layout.table.header.actions')
    if (typeof t !== 'string') {
      return [
        {
          text: t.id,
          align: 'center',
          value: 'id',
          width: 70,
        },
        {
          text: t.full_name,
          // sortable: false,
          value: 'full_name',
          width: 140,
        },
        {
          text: t.full_name_kana,
          align: 'start',
          value: 'full_name_kana',
          width: 180,
        },
        { text: t.department, value: 'department.name', width: 220 },
        { text: t.email, value: 'email', width: 270 },
        { text: t.email_verified_at, value: 'email_verified_at', width: 140 },
        { text: t.createdBy, value: 'createdBy', width: 140 },
        { text: t.created_at, value: 'created_at', width: 140 },
        {
          text: actions,
          value: 'actions',
          align: 'center',
          sortable: false,
          width: 80,
        },
      ]
    }
    return []
  },
}
