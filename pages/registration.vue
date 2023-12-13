<template lang="pug">
v-container.h-screen
  v-row.h-100(align='center', no-gutters)
    v-spacer
    v-col
      v-card.bg-secondary.d-flex.flex-column.align-center.justify-center.pa-10(
        width='500'
      )
        template(#title)
          p Новый член Бойцовского клуба
        v-form(ref='form', v-model='valid', @submit.prevent='createNewPlayer')
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
            v-col
              v-select(
                v-model='player.gender',
                label='Пол',
                :items='["М", "Ж"]',
                :rules='[validatePlayerGender]'
              )
            v-col.d-flex.align-center.justify-center(cols='12')
              v-btn(type='submit') Зарегистрироваться
    v-spacer
</template>

<script setup lang="ts">
const { api } = useFeathers()
const player = api.service('players').new({})
const form = ref()
// watchEffect(() => console.log(form.value))
const valid = ref(true)
const createNewPlayer = async () => {
  const validate = await form.value.validate()
  if (validate) {
    player.save()
  }
}
const validatePlayerName = (value: string) => {
  if (value?.length > 3) {
    return true
  }
  return 'Имя должно быть больше трех символов'
}

const validatePlayerMail = (value: string) => {
  const regex = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  if (regex.test(value)) {
    return true
  }
  return 'Введите правильный Эмейл'
}
const validatePlayerPass = (value: string) => {
  const regex = /.*[A-Z].*/
  if (regex.test(value)) {
    return true
  }
  return 'Пароль должен содержать хотябы 1 заглавную букву в  верхнем регистре'
}

const validatePlayerGender = (value: string) => {
  if (value) {
    return true
  }
  return 'Выберите свой пол'
}
</script>

<style scoped lang="scss"></style>
