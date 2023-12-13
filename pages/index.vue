<template lang="pug">
v-container.h-screen
  v-row.h-100(align='center', no-gutters)
    v-spacer
    v-col
      v-card.bg-secondary(width='500', height='250')
        template(#title)
          v-row(align='center', style='height: 90px')
            v-spacer
            v-col
              h1.text-h2.font-weight-bold.text-red Fight Club
            v-spacer
        v-row(align='center', no-gutters, style='height: 140px')
          v-col
            v-row
              v-col(align='center')
                v-btn(width='200', height='45', color='red', to='login') Логин
            v-row
              v-col(align='center')
                v-btn(
                  width='200',
                  height='45',
                  variant='outlined',
                  to='registration'
                ) Регистрация
    v-spacer
</template>

<script setup></script>

<style scoped lang="scss"></style>
