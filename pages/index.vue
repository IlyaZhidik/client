<template lang="pug">
DefaultCardWrapper(title='Fight Club')
  v-row(justify='center', align='center')
    v-col
      v-btn.text-subtitle-1(to='login') Логин
    v-col
      v-btn.text-subtitle-1(variant='outlined', to='registration') Регистрация
</template>

<script setup>
definePageMeta({
  layout: 'login',
})
</script>

<style scoped lang="scss"></style>
