<template>
  <div class="text-center">
    <h2 class="c-page-title">{{ $t('page.title.chat.report') }}</h2>
    <Loader v-if="loading" />
    <CustomTable
      v-else
      :headers="headers"
      :items="chatReports"
      @edit="handleDetail"
    />
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card v-if="activeChatReport">
          <h4 class="p-report-detail__title">
            {{ activeChatReport.report_category.name }}
          </h4>

          <div class="p-report-detail__meta">
            <div>
              <span class="p-report-detail__meta-label">投稿日時:</span>
              <span class="p-report-detail__meta-date">{{
                activeChatReport.chat_message.created_at
              }}</span>
            </div>
            <div class="mt-2">
              <span class="p-report-detail__meta-label">投稿者:</span>
              <nuxt-link
                :to="
                  localePath(
                    `/user/${activeChatReport.chat_message.created_by.id}`
                  )
                "
                >{{
                  activeChatReport.chat_message.created_by.full_name
                }}</nuxt-link
              >
            </div>
            <div class="p-report-detail__report-list mt-2">
              <div style="flex-shrink: 0">
                <span class="p-report-detail__meta-label">報告者:</span>
              </div>
              <div class="d-inline-block ml-1">
                <AvatarList :users="activeChatReport.created_by_list" />
              </div>
            </div>
          </div>
          <v-card-text>
            {{ activeChatReport.chat_message.body }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  watch,
  ref,
} from '@nuxtjs/composition-api'
import { chatReportTableHeaders } from '@/config/table'
import { useChatReport } from '@/hooks'

export default defineComponent({
  name: 'ChatReport',
  setup() {
    const { i18n, store } = useContext()
    const { chatReports, index, activeChatReportId } = useChatReport()
    const loading = ref(true)
    const dialog = ref(false)
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const headers = computed(() => chatReportTableHeaders.index(i18n))

    const activeChatReport = computed(() =>
      activeChatReportId.value === 0
        ? null
        : chatReports.value.find(
            (chatReport) => chatReport.id === activeChatReportId.value
          )
    )

    const handleDetail = (id: number) => {
      activeChatReportId.value = id
      dialog.value = true
    }

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          await index().finally(() => {
            loading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      headers,
      chatReports,
      loading,
      dialog,
      handleDetail,
      activeChatReport,
    }
  },
})
</script>
