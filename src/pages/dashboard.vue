<template>
  <div>
    <!-- <h2>ダッシュボード</h2> -->
    <div>
      <p>{{ admin.full_name }}さん、こんにちは</p>
      <v-row no-gutters>
        <v-col cols="12" class="mt-3">
          <!-- 最近５０件のアクティビティ -->
          <ActivityCard />
        </v-col>
        <v-col cols="12">
          <!-- 当月の報告件数 -->
          <ChatReportCard />
        </v-col>
        <v-col cols="12" md="6">
          <!-- チャット別報告件数 -->
          <ChatReportPerPostCard class="mr-md-3" />
        </v-col>
        <v-col cols="12" md="6">
          <!--ユーザー別報告件数 -->
          <ChatReportPerUserCard />
        </v-col>
        <v-col cols="12">
          <!-- 過去１年間の議事録件数 -->
          <MinutesCard />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { store } = useContext()
    const admin = computed(() => store.getters['admin/currentAdmin'])

    return {
      admin,
    }
  },
})
</script>
