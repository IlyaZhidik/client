<template lang="pug">
v-row(align='center', no-gutters)
  v-spacer
  v-col(cols='12', sm='7', md='5', lg='4', xl='3')
    v-card.bg-secondary(width='100%')
      v-row(align='center', style='height: 90px')
        v-col
          h1.text-sm-h3.text-h4.font-weight-bold.text-red.text-center characters
      v-row(align='center', no-gutters, style='height: 140px')
        v-col
          v-row
            v-col(align='center')
              v-btn(width='200', height='45', color='red', to='login') Логин
      p {{ characters }}
  v-spacer
</template>

<script setup lang="ts">
const { api } = useFeathers()
const charactersQuery = computed(() => '657b5f252332b21576af296e')
const characters = api.service('characters').useGet(charactersQuery)

watchEffect(() => {
  console.log(characters)
})
</script>

<style scoped lang="scss"></style>
