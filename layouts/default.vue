<template lang="pug">
v-container.d-flex.justify-end.bg-primary(style='min-height: 100vh', fluid='')
  v-btn.position-fixed.text-subtitle-1(
    style='top: 40px; right: 40px; z-index: 4',
    @click='logoutBtn'
  ) Logout
  v-row(align='center', no-gutters)
    v-spacer
    v-col(cols='11', sm='10', md='8', lg='7', xl='6')
      slot
    v-spacer
</template>

<script setup lang="ts">
const logoutBtn = async () => {
  const { logout } = useAuthStore()
  await logout()
  navigateTo('/')
}
</script>

<style scoped lang="scss"></style>
