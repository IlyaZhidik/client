<template lang="pug">
v-card.bg-secondary.px-5.px-sm-10.py-5.overflow-y-auto(
  width='100%',
  height='100%'
)
  v-row.mb-4
    v-col.text-center
      h4.text-red.text-h3.font-weight-bold {{ title }}
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
