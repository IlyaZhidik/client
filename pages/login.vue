<template lang="pug">
v-container.h-screen
  v-row.h-100(align='center', no-gutters)
    v-spacer
    v-col
      v-card.bg-secondary.d-flex.flex-column.align-center.justify-center.pa-10(
        width='500'
      )
        template(#title)
          p Кто ты войн?
        v-form(ref='form', @submit.prevent)
          v-row
            v-col(cols='12')
              v-text-field(type='text', label='mail')
            v-col(cols='12')
              v-text-field(type='text', label='пароль')
            v-col.d-flex.align-center.justify-center(cols='12')
              v-btn(type='submit') Войти
            v-col.d-flex.justify-end(cols='12')
              NuxtLink(to='/registration', style='text-decoration: none') зарегистрироваться
    v-spacer
</template>

<script setup></script>

<style scoped lang="scss"></style>
