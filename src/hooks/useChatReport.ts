import { ref } from '@nuxtjs/composition-api'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import { requestUri } from '~/config'
import { useAxios } from '@/hooks'
import { ChatReport } from '~/types/ts-axios'
import { toStrLabel } from '@/lib/util'

const useChatReport = () => {
  const chatReports = ref<ChatReport[]>([])
  const activeChatReportId = ref(0)
  const { getRequest } = useAxios()
  const elseUnit = (length: number) => (length > 1 ? ` 他${length - 1}名` : '')
  const index = async () => {
    await getRequest<Required<ChatReport>[]>(requestUri.chatReport.index).then(
      (res) => {
        if (ref.length) {
          const grouped = groupBy(
            res,
            (chatReport: ChatReport) =>
              `${chatReport.chat_message_id}_${chatReport.report_category_id}`
          )

          chatReports.value = map(
            grouped,
            (reports: Required<ChatReport>[]) => ({
              ...reports[0],
              count: reports.length,
              created_by_list: reports.map((report) => report.created_by),
              simple_reporter:
                reports[0].created_by.full_name + elseUnit(reports.length),
              chat_message: {
                ...reports[0].chat_message,
                created_at: toStrLabel(
                  new Date(reports[0].chat_message.created_at)
                ),
              },
            })
          )

          activeChatReportId.value = chatReports.value[0].id

          console.log(
            chatReports.value.find(
              (chatReport) => chatReport.id === activeChatReportId.value
            )
          )
        }
      }
    )
  }

  return {
    chatReports,
    activeChatReportId,
    index,
  }
}

export default useChatReport
