<template lang="pug">
v-dialog(v-model='dialog', persistent)
  v-row
    v-spacer
    v-col(cols='11', md='6')
      DefaultCardWrapper(title='')
        slot
        slot(name='actions')
    v-spacer
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped lang="scss"></style>
