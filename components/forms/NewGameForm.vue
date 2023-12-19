<template lang="pug">
v-form(ref='formRef', @submit.prevent)
  v-row
    v-col(cols='12')
      v-text-field(
        v-model='game.name',
        type='text',
        :rules='[validateName]',
        label='Название'
      )
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: IGame
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: IGame): void
}>()

const {
  rules: { validateName },
} = useValidation()

const formRef = ref()

const game = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const validate = async () => {
  return await formRef.value.validate()
}

defineExpose({ validate })
</script>

<style scoped lang="scss"></style>
