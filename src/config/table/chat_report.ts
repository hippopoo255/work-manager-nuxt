// import { DataTableHeader } from 'vuetify'
import { NuxtI18nInstance } from 'nuxt-i18n'

export const chatReportTableHeaders = {
  index: (i18n: NuxtI18nInstance) => {
    const t = i18n.t('layout.table.header.chat_report.index')
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
          text: t.roomName,
          align: 'left',
          value: 'chat_message.chat_room.name',
          width: 180,
        },
        {
          text: t.messageId,
          align: 'center',
          value: 'chat_message.id',
          width: 120,
        },
        {
          text: t.messageBody,
          align: 'left',
          value: 'chat_message.dot_body',
          width: 220,
        },
        {
          text: t.writtenBy,
          align: 'left',
          // sortable: false,
          value: 'chat_message.created_by.full_name',
          width: 140,
        },
        {
          text: t.createdBy,
          align: 'left',
          // sortable: false,
          value: 'simple_reporter',
          width: 200,
        },
        {
          text: t.reportCategory,
          align: 'left',
          // sortable: false,
          value: 'report_category.name',
          width: 140,
        },
        { text: t.count, value: 'count', width: 110 },
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
