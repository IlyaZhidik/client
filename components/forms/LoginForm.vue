<template lang="pug">
v-form(ref='form', @submit.prevent)
  v-row
    v-col(cols='12')
      v-text-field(v-model='player.email', type='text', label='mail')
    v-col(cols='12')
      v-text-field(v-model='player.password', type='text', label='пароль')
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: IPlayer
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: IPlayer): void
}>()

const player = computed({
  get: () => props.modelValue,
  set: (value: IPlayer) => emit('update:modelValue', value),
})
</script>

<style scoped lang="scss"></style>
