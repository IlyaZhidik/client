<template lang="pug">
v-app
  v-main
    v-container.bg-primary.d-flex.justify-end(style='min-height: 100vh', fluid)
      v-row(align='center', no-gutters)
        v-spacer
        v-col(cols='11', sm='10', md='6', lg='4', xl='4')
          slot
        v-spacer
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
