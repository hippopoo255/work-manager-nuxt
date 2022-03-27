<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" md="6">
      <div class="u-md-w-450-center">
        <v-row no-gutters>
          <v-col cols="12">
            <BlankCard title-center>
              <div slot="card-title" class="aggregate__title">
                {{ $t('card.title.reportCount') }}
                {{ $t('card.title.sub.chat') }}
              </div>
              <Loader
                v-if="chatLoading"
                slot="card-text"
                class="aggregate__body"
              />
              <div v-else slot="card-text" class="aggregate__body">
                <span class="aggregate__count u-text-chat u-count-num">{{
                  totalCount
                }}</span>
                <span class="aggregate__unit">{{ $t('unit.default') }}</span>
              </div>
            </BlankCard>
          </v-col>
        </v-row>
        <!-- チャット別報告件数 -->
        <ChatReportPerPostCard
          :filtered-user-id="user.id"
          @fetched="handleCount"
        />
      </div>
    </v-col>
    <v-col cols="12" md="6" class="mt-4 mt-md-0">
      <div class="u-md-w-450-center ml-md-4">
        <v-row no-gutters>
          <v-col cols="12">
            <BlankCard title-center>
              <div slot="card-title" class="aggregate__title">
                {{ $t('card.title.minutesCount') }}
              </div>
              <Loader
                v-if="minutesLoading"
                slot="card-text"
                class="aggregate__body"
              />
              <div v-else slot="card-text" class="aggregate__body">
                <span class="aggregate__count u-text-minutes u-count-num">{{
                  minutesTotalCount
                }}</span>
                <span class="aggregate__unit">{{ $t('unit.default') }}</span>
              </div>
            </BlankCard>
          </v-col>
        </v-row>
        <!-- チャット別報告件数 -->
        <MinutesCard
          :filtered-user-id="user.id"
          @fetched="handleMinutesCount"
        />
      </div>
    </v-col>
    <!-- <v-col cols="12" md="6"> </v-col> -->
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { User } from '~/types/ts-axios'
export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      default: () => ({}),
    },
  },
  setup() {
    const totalCount = ref(0)
    const minutesTotalCount = ref(0)
    const chatLoading = ref(true)
    const minutesLoading = ref(true)

    const handleCount = ({
      count,
      loading,
    }: {
      count: number
      loading: boolean
    }) => {
      totalCount.value = count
      chatLoading.value = loading
    }

    const handleMinutesCount = ({
      count,
      loading,
    }: {
      count: number
      loading: boolean
    }) => {
      minutesTotalCount.value = count
      minutesLoading.value = loading
    }

    return {
      totalCount,
      minutesTotalCount,
      handleCount,
      handleMinutesCount,
      chatLoading,
      minutesLoading,
    }
  },
})
</script>

<style lang="scss">
.aggregate {
  &__title {
    font-size: 12px;
    line-height: 1.25;
    opacity: 0.7;
  }
  &__body {
    text-align: center;
  }
  &__unit {
    font-size: 14px;
    opacity: 0.7;
  }
  &__count {
    font-size: 44px;
    // font-weight: 700;
  }
}
</style>
