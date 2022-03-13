<template>
  <Loader v-if="pref_id === 0" />
  <BaseFormCard
    v-else
    :title="$t('page.title.organization.index')"
    @submit="update"
  >
    <template slot="form-content">
      <v-text-field
        v-model="name"
        :rules="rules.name"
        :label="$t('attribute.organization.name')"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="name_kana"
        :rules="rules.name_kana"
        :label="$t('attribute.organization.name_kana')"
        required
      ></v-text-field>
      <v-row>
        <v-col class="d-flex align-center">
          <v-text-field
            v-model="postal_code"
            :rules="rules.postal_code"
            :label="$t('attribute.organization.postal_code')"
            required
          ></v-text-field>
          <v-btn
            color="primary"
            class="ml-2 mb-2"
            outlined
            @click="handleAddress"
            >{{ $t('submit.address') }}</v-btn
          >
        </v-col>
        <!-- <v-col cols="6">
        </v-col> -->
      </v-row>
      <v-select
        v-model="pref_id"
        :items="prefectures"
        :label="$t('attribute.organization.pref_id')"
        item-text="name"
        item-value="id"
        :rules="rules.pref_id"
      ></v-select>
      <!-- <v-text-field
        v-model="pref_id"
        :rules="rules.pref_id"
        :label="$t('attribute.organization.pref_id')"
        required
      ></v-text-field> -->
      <v-text-field
        v-model="city"
        :rules="rules.city"
        :label="$t('attribute.organization.city')"
        required
      ></v-text-field>
      <v-text-field
        v-model="address"
        :rules="rules.address"
        :label="$t('attribute.organization.address')"
        required
      ></v-text-field>
      <v-text-field
        v-model="tel"
        type="number"
        :rules="rules.tel"
        :label="$t('attribute.organization.tel')"
        required
      ></v-text-field>
    </template>
    <template slot="form-bottom">
      <FormSubmitRow :loading="loading" :submit-value="submitText" />
    </template>
  </BaseFormCard>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  watch,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { organizationUpdateRule } from '@/config/validationRule'
import { useOrganization } from '@/hooks'
import fetchAddressByPostalCode from '@/lib/axios-jsonp'

export default defineComponent({
  name: 'OrganizationForm',
  setup(_props) {
    const { i18n, store } = useContext()
    const { save, prefectures, fetchPrefecture } = useOrganization()
    const form = ref<any>(null)
    const name = ref('')
    const name_kana = ref('')
    const postal_code = ref(0)
    const pref_id = ref(0)
    const city = ref('')
    const address = ref('')
    const tel = ref('')

    const admin = computed(() => store.getters['admin/currentAdmin'])
    const isSignIn = computed(() => store.getters['admin/isSignin'])
    const submitText = computed(() => i18n.t('submit.update'))
    const loading = ref(false)

    const rules = ref(organizationUpdateRule(i18n))

    const fetch = () => {
      if (admin.value) {
        const organization = admin.value.organization
        name.value = organization.name
        name_kana.value = organization.name_kana
        postal_code.value = organization.postal_code
        pref_id.value = organization.pref_id
        city.value = organization.city
        address.value = organization.address
        tel.value = organization.tel
        fetchPrefecture()
      }
    }

    watch(
      () => isSignIn.value,
      () => fetch(),
      { immediate: true }
    )

    const update = async () => {
      loading.value = true
      const data = {
        name: name.value,
        name_kana: name_kana.value,
        postal_code: postal_code.value,
        pref_id: pref_id.value,
        city: city.value,
        address: address.value,
        tel: tel.value,
      }

      await save(data, admin.value.organization.id).finally(() => {
        loading.value = false
      })
    }

    const handleAddress = async () => {
      await fetchAddressByPostalCode(postal_code.value).then((res) => {
        if (res.code === 200) {
          const data = res.data
          const pref = prefectures.value.find((p) => p.name === data.pref)
          if (pref) {
            pref_id.value = pref.id
          }
          city.value = data.city
          address.value = data.town
        }
      })
    }

    return {
      form,
      handleAddress,
      name,
      name_kana,
      postal_code,
      pref_id,
      city,
      address,
      tel,
      isSignIn,
      rules,
      update,
      loading,
      submitText,
      prefectures,
    }
  },
})
</script>
