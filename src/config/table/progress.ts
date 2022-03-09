// import { DataTableHeader } from 'vuetify'
import { NuxtI18nInstance } from 'nuxt-i18n'

export const progressTableHeaders = {
  index: (i18n: NuxtI18nInstance) => {
    const t = i18n.t('layout.table.header.progress.index')
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
          text: t.name,
          align: 'start',
          value: 'name',
          width: 140,
        },
        {
          text: t.value,
          // sortable: false,
          value: 'value',
          width: 180,
        },
        { text: t.createdBy, value: 'created_by.full_name', width: 140 },
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
