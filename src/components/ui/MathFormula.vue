<script setup>
import { onMounted, ref, watch } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const props = defineProps({
  formula: {
    type: String,
    required: true,
  },
  displayMode: {
    type: Boolean,
    default: false,
  },
})

const element = ref(null)

const renderFormula = () => {
  if (element.value) {
    katex.render(props.formula, element.value, {
      throwOnError: false,
      displayMode: props.displayMode,
    })
  }
}

onMounted(renderFormula)

watch(() => props.formula, renderFormula)
</script>

<template>
  <span ref="element"></span>
</template>

<style>
/* Дополнительные стили при необходимости */
</style>
