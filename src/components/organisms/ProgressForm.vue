<template>
  <div class="p-form">
    <v-text-field
      v-model="name"
      :rules="rules.name"
      :label="$t('attribute.name.progress')"
      :counter="$formCounter.default[1]"
      required
    ></v-text-field>
    <v-text-field
      v-model="value"
      type="number"
      min="0"
      max="255"
      :rules="rules.value"
      :label="$t('attribute.value.progress')"
      :counter="$formCounter.short[1]"
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
import { departmentRule } from '@/config/validationRule'
import { Progress } from '@/types/ts-axios'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Progress | undefined>,
      required: false,
      default: undefined,
    },
    loading: { type: Boolean as PropType<boolean>, default: false },
  },
  setup(props, { emit }) {
    const { i18n } = useContext()
    const rules = computed(() => departmentRule(i18n))
    const value = ref(0)
    const name = ref('')
    const fetchFormData = () => {
      if (props.item !== undefined) {
        name.value = props.item.name
        value.value = props.item.value
      } else {
        name.value = ''
        value.value = 0
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
            value: value.value,
          })
        }
      },
      { immediate: true }
    )

    return { value, name, rules }
  },
})
</script>
