<template lang="pug">
v-card.bg-secondary.pa-10(width='100%')
  v-row
    v-col.text-center
      h4.text-red.text-h4.font-weight-bold {{ title }}
  v-row
    v-col
      slot
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss"></style>
