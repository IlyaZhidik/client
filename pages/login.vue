<template lang="pug">
DefaultCardWrapper(title='Кто ты войн?')
  LoginForm(ref='loginFormRef', v-model='user')
  v-row
    v-col(cols='12')
      v-btn.text-subtitle-1(@click='auth') Войти
    v-col.text-end(cols='12')
      NuxtLink.text-h6.text-primary(
        to='/registration',
        style='text-decoration: none'
      ) Зарегистрироваться
</template>

<script setup lang="ts">
import { useSnackbarStore } from '~/stores/snackbar'
definePageMeta({
  layout: 'login',
})
const authStore = useAuthStore()
const snackbar = useSnackbarStore()

const user = ref({
  email: '',
  password: '',
})
const loginFormRef = ref()

const auth = async () => {
  try {
    await authStore.authenticate({
      strategy: 'local',
      email: user.value.email,
      password: user.value.password,
    })
    await navigateTo('/characters')
    snackbar.open('success', 'В бой')
  } catch (e: any) {
    snackbar.open('error', e.message)
  }
}
</script>

<style scoped lang="scss"></style>
