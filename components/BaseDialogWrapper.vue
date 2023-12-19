<template lang="pug">
Teleport(to='body')
  v-dialog(v-model='dialog', :width='dialogWidth', persistent='')
    DefaultCardWrapper(:title='title')
      slot
      slot(name='actions')
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const props = defineProps<{
  modelValue: boolean
  title: string
}>()

const { width } = useDisplay()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dialogWidth = computed(() => {
  if (width.value < 600) {
    return '100%'
  }
  if (width.value < 900) {
    return '80%'
  }
  if (width.value < 1200) {
    return '60%'
  }
  return '50%'
})
</script>

<style scoped lang="scss"></style>
