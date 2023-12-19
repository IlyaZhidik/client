<template lang="pug">
v-row(align='center', no-gutters)
  v-spacer
  v-col(cols='11', sm='10', md='8', lg='7', xl='6')
    DefaultCardWrapper(title='Новый член Бойцовского клуба')
      v-row(align='center')
        v-spacer
        v-col(cols='12', sm='11', md='9', lg='9', xl='8')
          v-form(
            ref='form',
            v-model='valid',
            @submit.prevent='createNewPlayer'
          )
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
              v-col.d-flex.justify-end(cols='12')
                NuxtLink(to='/login', style='text-decoration: none') Логин
        v-spacer
  v-spacer
</template>

<script setup lang="ts">
const { api } = useFeathers()
const player = api.service('players').new({})
const form = ref()
// watchEffect(() => console.log(form.value))
const valid = ref(true)
const createNewPlayer = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    await player.save()
    await navigateTo('/menu')
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
