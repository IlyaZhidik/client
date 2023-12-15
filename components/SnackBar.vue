<template lang="pug">
v-snackbar(
  v-model='snackbar',
  :text='text',
  :color='color',
  :timeout='timeout',
  min-height='100',
  min-width='1000'
)
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const { snackbar, text, color, timeout } = storeToRefs(useSnackbarStore())
console.log(snackbar, text)
</script>

<style scoped lang="scss"></style>
