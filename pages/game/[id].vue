<template lang="pug">
v-row(no-gutters)
  v-col(cols='11', sm='10', md='8', lg='7', xl='6')
    v-card.bg-secondary.pa-10
      v-row
        v-col.text-center
          v-container
            p.text-sm-h2.text-h4.font-weight-bold.text-green Ваше здоровье
            .healthbar(
              width='100%',
              style='height: 40px; border: 1px solid #575757; margin: 1rem 0; background: green'
            )
    v-card.bg-secondary.pa-10
      v-row
        v-col.text-center
          v-container
            p.text-sm-h2.text-h4.font-weight-bold.text-red здоровье врага
            .healthbar.border-solid.ma-1.bg-red(
              style='height: 40px',
              :style='{ width: playerHealth }'
            )
    v-card.bg-secondary.pa-10(width='100%')
      v-row
        v-spacer
        v-col(cols='8', xs='12')
          v-list.bg-primary.rounded-lg.pa-1
            v-list-item.my-2.bg-white.rounded-lg(width='100%')
              template(#append)
                v-btn Удалить
              p Присоедениться: {{ raund }}
        v-spacer
      v-row
        v-spacer
        v-col(cols='4')
          v-dialog(v-model='dialog', persistent, width='600')
            template(#activator='{ props }')
              v-btn(color='primary', v-bind='props', width='100%', height='40') Create Game
            v-card
              v-card-title
                span.text-h5 Enter the name of the lobby
              v-card-text
                v-container
                  v-form(ref='form', @submit.prevent='')
                    v-row
                      v-col(cols='12')
                        v-text-field(
                          type='text',
                          :rules='[]',
                          label='Название'
                        )
                      v-col.d-flex.align-center.justify-center(cols='12')
                        v-btn(type='submit') Новая Игра
              v-card-actions
                v-spacer
                v-btn(
                  color='blue-darken-1',
                  variant='text',
                  @click='dialog = false'
                ) Close
              p {{  }}
        v-spacer
  v-spacer
</template>

<script setup lang="ts">
const dialog = ref(false)
const playerHealth = ref(100)
const firstRaund = ref(1)
const getRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}
const playerHit = (): number => {
  const attackValue = getRandomValue(5, 12)
  const raund = firstRaund + 1
  return (playerHealth -= attackValue)
}
</script>

<style scoped lang="scss"></style>
