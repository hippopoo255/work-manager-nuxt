<template>
  <div class="l-authenticatable">
    <AuthenticatableCard :authenticatable="user" :menus="menus">
      <template slot="authenticatable-content">
        <div class="mt-8 mt-md-12">
          <v-row no-gutters justify="center">
            <v-col cols="12" md="6">
              <h3 class="c-title u-mb-4">
                {{ $t('page.title.user.activity') }}
              </h3>
              <ActivityList :activities="activities" :loading="loading" />
              <MoreLink
                v-if="hasMore"
                :loading="moreLoading"
                @more="handleMore"
              />
            </v-col>
          </v-row>
        </div>
      </template>
    </AuthenticatableCard>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  watch,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import { useAdmin, useUser, useActivity } from '@/hooks'
import { User } from '~/types/ts-axios'
import { faceUrl } from '~/lib/util'

export default defineComponent({
  name: 'UserDetailList',
  setup() {
    const { show } = useUser()
    const { save } = useAdmin()
    const { app, store, i18n } = useContext()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(true)
    const moreLoading = ref(false)
    const user = ref<User | null>(null)
    const { activities, fetchActivities, hasMore } = useActivity()
    const isSignin = computed(() => store.getters['admin/isSignin'])
    const facePath = computed(() =>
      user.value?.file_path ? faceUrl(user.value?.file_path) : ''
    )
    const bgPath = computed(() => {
      return user.value?.organization?.file_path
        ? faceUrl(user.value.organization.file_path)
        : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
    })

    const handleAlert = async () => {
      if (user.value && user.value.is_invited) {
        alert(i18n.t('alert.modal.invite'))
        return false
      }
      if (
        confirm(String(i18n.t('confirm.invite'))) &&
        user.value &&
        !user.value.is_invited
      ) {
        loading.value = true

        const inputs = {
          email: user.value?.email || '',
          family_name: user.value?.family_name,
          family_name_kana: user.value?.family_name_kana,
          given_name: user.value?.given_name,
          given_name_kana: user.value?.given_name_kana,
          department_id: user.value?.department?.id,
          organization_id: user.value?.organization_id,
        }
        await save(inputs).finally(() => {
          loading.value = false
        })
      }
    }

    const menus = computed(() => [
      {
        btnText: i18n.t('link.edit.profile'),
        handle: () => {
          if (user.value) {
            router.push(
              app.localePath({
                name: 'user-edit-id',
                params: {
                  id: String(user.value.id),
                },
              })
            )
          }
        },
      },
      {
        btnText:
          user.value && user.value.is_invited
            ? i18n.t('status.inviteAdmin')
            : i18n.t('submit.inviteAdmin'),
        handle: () => handleAlert(),
        // color: 'primary',
        disabled: loading.value || (user.value && user.value.is_invited),
      },
    ])

    watch(
      () => isSignin.value,
      async (isSignin) => {
        if (isSignin) {
          const param = route.value.params
          await show(Number(param.id)).then((u) => {
            user.value = u
          })
          await fetchActivities(Number(param.id))
          loading.value = false
        }
      },
      { immediate: true }
    )

    const handleMore = async () => {
      moreLoading.value = true
      const param = route.value.params
      await fetchActivities(Number(param.id))
      moreLoading.value = false
    }

    return {
      activities,
      bgPath,
      facePath,
      handleMore,
      hasMore,
      loading,
      menus,
      moreLoading,
      user,
    }
  },
})
</script>
