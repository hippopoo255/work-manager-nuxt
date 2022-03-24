<template>
  <Loader v-if="loading" />
  <div v-else class="u-w-450-center">
    <v-row no-gutters>
      <v-col cols="12" class="custom-col">
        <!-- 部署 -->
        <div class="label">部署</div>
        <div class="value">{{ authenticatable.department.name }}</div>
      </v-col>
      <v-col cols="12" class="custom-col">
        <!-- メールアドレス -->
        <div class="label">メールアドレス</div>
        <div class="value">{{ authenticatable.email }}</div>
      </v-col>

      <v-col cols="12" class="custom-col">
        <v-row no-gutters>
          <v-col>
            <!-- 姓 -->
            <div class="label">姓</div>
            <div class="value">{{ authenticatable.family_name }}</div>
          </v-col>
          <v-col>
            <!-- 名 -->
            <div class="label">名</div>
            <div class="value">{{ authenticatable.given_name }}</div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="custom-col">
        <v-row no-gutters>
          <v-col>
            <!-- セイ -->
            <div class="label">セイ</div>
            <div class="value">{{ authenticatable.family_name_kana }}</div>
          </v-col>
          <v-col>
            <!-- メイ -->
            <div class="label">メイ</div>
            <div class="value">{{ authenticatable.given_name_kana }}</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { User } from '~/types/ts-axios'
export default defineComponent({
  props: {
    authenticatable: {
      type: Object as PropType<User>,
      required: true,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup() {},
})
</script>
<style lang="scss">
.label {
  font-size: 14px;
  opacity: 0.6;
  margin-bottom: 4px;
}
.value {
  font-size: 14px;
}
.row.no-gutters > .col,
.row.no-gutters > [class*='col-'] {
  &.custom-col {
    padding-bottom: 16px;
    &:not(:first-of-type) {
      border-top: 1px solid $lightGrey1;
      padding-top: 16px;
    }
    &:last-of-type {
      border-bottom: 1px solid $lightGrey1;
    }
  }
}
</style>
