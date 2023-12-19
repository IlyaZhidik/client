<template lang="pug">
v-form(ref='formRef', @submit.prevent)
  v-row
    v-col(cols='12')
      v-text-field(
        v-model='player.nickname',
        type='text',
        :rules='[validatePlayerName]',
        label='НИК'
      )
    v-col(cols='12')
      v-text-field(
        v-model='player.email',
        type='text',
        :rules='[validatePlayerMail]',
        label='мейл'
      )
    v-col(cols='12')
      v-text-field(
        v-model='player.password',
        type='text',
        :rules='[validatePlayerPass]',
        label='пароль'
      )
    v-col(cols='12')
      v-select(
        v-model='player.gender',
        label='Пол',
        :items='["М", "Ж"]',
        :rules='[validatePlayerGender]'
      )
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: IPlayer
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: IPlayer): void
}>()

const {
  rules: {
    validatePlayerName,
    validatePlayerMail,
    validatePlayerPass,
    validatePlayerGender,
  },
} = useValidation()

const formRef = ref()

const player = computed({
  get: () => props.modelValue,
  set: (value: IPlayer) => emit('update:modelValue', value),
})

const validate = async () => {
  return await formRef.value.validate()
}

defineExpose({ validate })
</script>

<style scoped lang="scss"></style>
