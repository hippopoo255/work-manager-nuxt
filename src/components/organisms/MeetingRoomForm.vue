<template>
  <div class="p-form">
    <v-text-field
      v-model="name"
      :rules="rules.name"
      :label="$t('attribute.name.meeting_room')"
      :counter="$formCounter.short[1]"
      autofocus
      required
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  PropType,
  watch,
} from '@nuxtjs/composition-api'
import { meetingRoomRule } from '@/config/validationRule'
import { MeetingPlace } from '@/types/ts-axios'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MeetingPlace | undefined>,
      required: false,
      default: undefined,
    },
    loading: { type: Boolean as PropType<boolean>, default: false },
  },
  setup(props, { emit }) {
    const { i18n } = useContext()
    const rules = computed(() => meetingRoomRule(i18n))
    const name = ref('')

    const fetchFormData = () => {
      if (props.item !== undefined) {
        name.value = props.item.name
      } else {
        name.value = ''
      }
    }

    watch(
      () => props.item,
      () => fetchFormData(),
      { immediate: true }
    )

    watch(
      () => props.loading,
      (loading) => {
        if (loading) {
          emit('fetched', {
            name: name.value,
          })
        }
      },
      { immediate: true }
    )

    return { name, rules }
  },
})
</script>
