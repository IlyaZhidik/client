<template lang="pug">
v-app
  v-main
    v-btn.position-fixed.text-subtitle-1(
      style='top: 40px; right: 40px; z-index: 4',
      width='200px',
      @click='logoutBtn'
    ) Сменить Личность
    v-container.bg-primary.pa-0.h-100(style='min-height: 100vh', fluid)
      v-row.h-100(no-gutters, align='center')
        v-spacer
        v-col(cols='11', sm='10', md='6', lg='4', xl='4')
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
