<template lang="pug">
v-row(align='center', no-gutters)
  v-spacer
  v-col(cols='11', sm='10', md='8', lg='7', xl='6')
    v-card.bg-secondary.pa-10(width='100%')
      v-row
        v-col
          p.text-sm-h3.text-h4.font-weight-bold.text-red.text-center Кто ты войн?
      v-form(ref='form', @submit.prevent='auth')
        v-row
          v-col(cols='12')
            v-text-field(v-model='user.email', type='text', label='mail')
          v-col(cols='12')
            v-text-field(v-model='user.password', type='text', label='пароль')
          v-col.d-flex.align-center.justify-center(cols='12')
            v-btn(type='submit') Войти
          v-col.d-flex.justify-end(cols='12')
            NuxtLink(to='/registration', style='text-decoration: none') зарегистрироваться
  v-spacer
</template>

<script setup lang="ts">
import { useSnackbarStore } from '~/stores/snackbar'
definePageMeta({
  layout: 'login',
})
const authStore = useAuthStore()

const snackbarStore = useSnackbarStore()
const user = ref({
  email: '',
  password: '',
})

const auth = async () => {
  try {
    const res = await authStore.authenticate({
      strategy: 'local',
      ...user.value,
    })
    await navigateTo('/menu')
    snackbarStore.open('success', 'В бой')
  } catch (e: any) {
    console.log(e.message)
    console.log(snackbarStore)
    snackbarStore.open('error', e.message)
  }
}
</script>

<style scoped lang="scss"></style>
