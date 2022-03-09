<template>
  <div class="l-master-form">
    <v-btn color="pink" dark fab @click="handleAdd">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="show">
      <BaseFormCard :title="title" @submit="handleSubmit">
        <template slot="form-content">
          <DepartmentForm
            v-if="model === 'department'"
            :item="item"
            :loading="loading"
            @fetched="handleSave"
          />
          <MeetingRoomForm
            v-if="model === 'meeting_room'"
            :item="item"
            :loading="loading"
            @fetched="handleSave"
          />
          <ProgressForm
            v-if="model === 'progress'"
            :item="item"
            :loading="loading"
            @fetched="handleSave"
          />
        </template>
        <template slot="form-bottom">
          <FormSubmitRow
            :loading="loading"
            :submit-value="submitButtonText"
            class="text-center"
          />
        </template>
      </BaseFormCard>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import { useMaster } from '~/hooks'
import { Inputs } from '~/hooks/useMaster'

export default defineComponent({
  props: {
    model: { type: String as PropType<string>, default: 'department' },
    title: { type: String as PropType<string>, default: '' },
    item: {
      type: [Object, undefined] as PropType<any>,
      required: false,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const show = ref(false)
    const loading = ref(false)
    const { save } = useMaster()
    const { i18n } = useContext()

    watch(
      () => props.item,
      (item) => {
        if (item) {
          show.value = !show.value
        }
      },
      { immediate: true }
    )

    watch(
      () => show.value,
      (isShow) => {
        if (!isShow) {
          emit('close')
        }
      },
      { immediate: true }
    )

    const submitButtonText = computed(() =>
      props.item === undefined
        ? i18n.t('submit.create')
        : i18n.t('submit.update')
    )

    const handleAdd = () => {
      show.value = true
    }

    const handleSubmit = () => {
      loading.value = true
    }

    const handleSave = async (inputs: Inputs) => {
      const id = props.item === undefined ? undefined : props.item.id
      await save(inputs, id)
        .then((item) => {
          show.value = false
          emit('saved', item)
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      handleSave,
      handleAdd,
      loading,
      show,
      submitButtonText,
      handleSubmit,
    }
  },
})
</script>

<style scoped></style>
