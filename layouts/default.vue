<template lang="pug">
v-container.bg-primary.d-flex.justify-end(style='min-height: 100vh', fluid='')
  v-btn.text-subtitle-1(@click='logoutBtn') Logout
  .position-absolute.w-100(
    style='top: 50%; left: 50%; transform: translate(-50%, -50%)'
  )
    slot
</template>

<script setup lang="ts">
const logoutBtn = async () => {
  const { logout } = useAuthStore()
  await logout()
  navigateTo('/')
}
</script>

<style scoped lang="scss"></style>
