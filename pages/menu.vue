<template lang="pug">
v-row(align='center', no-gutters)
  v-spacer
  v-col(cols='11', sm='10', md='8', lg='7', xl='6')
    v-card.bg-secondary.pa-10(width='100%')
      v-row
        v-col.text-center
          p.text-sm-h2.text-h4.font-weight-bold.text-red Создайте или выберите лобби
      v-row
        v-spacer
        v-col(cols='8', xs='12')
          v-list.bg-primary.rounded-lg.pa-1
            v-list-item.my-2.bg-white.rounded-lg(
              v-for='(game, index) in games.data',
              :key='index',
              width='100%'
            )
              template(#append)
                v-btn(color='red', @click='deleteBtn(game._id)') Удалить
              p Присоедениться: {{ game.name }}
        v-spacer
      v-row
        v-spacer
        v-col(cols='4')
          v-dialog(v-model='dialog', persistent, width='600')
            template(#activator='{ props }')
              v-btn(
                color='primary',
                v-bind='props',
                width='100%',
                height='40',
                @click='game = api.service("game").new({})'
              ) Create Game
            v-card
              v-card-title
                span.text-h5 Enter the name of the lobby
              v-card-text
                v-container
                  v-form(
                    ref='form',
                    v-model='valid',
                    @submit.prevent='createNewGame'
                  )
                    v-row
                      v-col(cols='12')
                        v-text-field(
                          v-model='game.name',
                          type='text',
                          :rules='[validateName]',
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
        v-spacer

  v-spacer
</template>

<script setup lang="ts">
const form = ref()
const dialog = ref(false)
const valid = ref(true)
const { api } = useFeathers()
const game = ref()
const { playerId } = useAuthStore()
const gamesQuery = computed(() => ({
  query: { $limit: 100, enemyId: { $exists: false }, hostId: playerId },
}))
const games = api.service('game').useFind(gamesQuery, { paginateOn: 'server' })

// const createNewGame = async () => {
//   try {
//     const newGame = api.service('game').new({})
//     await newGame.save()
//   } catch (e) {
//     console.log(e)
//   }
// }
const createNewGame = async () => {
  try {
    const { valid } = await form.value.validate()
    if (valid) {
      console.log(game.value)
      game.value.hostId = playerId
      await game.value.save()
      dialog.value = false
    }
  } catch (e) {
    console.log(e)
  }
}

const deleteBtn = async (id: string) => {
  console.log(id)
  try {
    await api.service('game').remove(id)
  } catch (e) {
    console.log(e)
  }
}
const validateName = (value: string) => {
  if (value?.length > 3) {
    return true
  }
  return 'Имя должно быть больше трех символов'
}
</script>

<style scoped lang="scss"></style>
