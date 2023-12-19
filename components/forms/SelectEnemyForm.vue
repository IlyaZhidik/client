<template lang="pug">
v-form(ref='formRef')
  v-row
    v-col
      v-select(
        v-model='selectedEnemy',
        label='Выбери соперника',
        :items='whoItems',
        item-title='label',
        item-value='value',
        :rules='[required]'
      )
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const {
  rules: { required },
} = useValidation()

const formRef = ref()

const selectedEnemy = computed({
  get: () => props.modelValue,
  set: (value: IPlayer) => emit('update:modelValue', value),
})

const validate = async () => {
  return await formRef.value.validate()
}

const whoItems = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'Warrior',
    value: 'warrior',
  },
  {
    label: 'Mage',
    value: 'mage',
  },
]

defineExpose({ validate })
</script>

<style scoped lang="scss"></style>
