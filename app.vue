<template lang="pug">
SnackBar
NuxtLayout
  NuxtPage
</template>

<script setup lang="ts"></script>

<style lang="scss">
html {
  overflow-y: auto;
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
