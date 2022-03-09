<template>
  <div class="p-form">
    <v-text-field
      v-model="department_code"
      :rules="rules.department_code"
      :label="$t('attribute.department_code')"
      :counter="$formCounter.short[1]"
      :placeholder="$t('placeholder.department_code')"
      autofocus
    ></v-text-field>
    <v-text-field
      v-model="name"
      :rules="rules.name"
      :label="$t('attribute.name.department')"
      :counter="$formCounter.default[1]"
      required
    ></v-text-field>
    <div class="color-select">
      <div class="color-navigator">
        <span class="u-full-round" :class="bgColorClasss"></span>
      </div>
      <v-select
        v-model="color"
        :items="colors"
        :label="$t('attribute.color')"
        item-text="name"
        item-value="name"
        single-line
      ></v-select>
    </div>
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
import { Department } from '@/types/ts-axios'
import { colors } from '@/config'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Department | undefined>,
      required: false,
      default: undefined,
    },
    loading: { type: Boolean as PropType<boolean>, default: false },
  },
  setup(props, { emit }) {
    const { i18n } = useContext()
    const rules = computed(() => departmentRule(i18n))
    const department_code = ref('')
    const color = ref('')
    const name = ref('')

    const fetchFormData = () => {
      if (props.item !== undefined) {
        department_code.value = props.item.department_code
        name.value = props.item.name
        color.value = props.item.color || ''
      } else {
        department_code.value = ''
        name.value = ''
        color.value = ''
      }
    }

    const bgColorClasss = computed(() => [`--${color.value}`])

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
            department_code: department_code.value,
            name: name.value,
            color: color.value,
          })
        }
      },
      { immediate: true }
    )

    return {
      color,
      department_code,
      name,
      rules,
      colors,
      bgColorClasss,
    }
  },
})
</script>
<style lang="scss">
.color-select {
  position: relative;
  padding-left: 32px;
}
.color-navigator {
  position: absolute;
  bottom: 19px;
  left: 0;
}
</style>
