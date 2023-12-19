<template lang="pug">
DefaultCardWrapper(title='Новый член Бойцовского клуба')
  RegistrationForm(ref='registrationFormRef', v-model='player')
  v-row.mt-5
    v-col.text-center(cols='12')
      v-btn.text-subtitle-1(@click='createNewPlayer') Зарегистрироваться
    v-col.text-end(cols='12')
      NuxtLink.text-h6.text-primary(to='/login', style='text-decoration: none') Логин
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login',
})
const { api } = useFeathers()
const snackbar = useSnackbarStore()
const registrationFormRef = ref()
const player = api.service('players').new({})

const createNewPlayer = async () => {
  const { valid } = await registrationFormRef.value.validate()
  if (!valid) return snackbar.open('error', 'Пропущенные обязательные поля!')
  try {
    await player.save()
    navigateTo('/login')
  } catch (e) {
    snackbar.open('error', e.message)
  }
}
</script>

<style scoped lang="scss"></style>
