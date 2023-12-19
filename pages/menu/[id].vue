<template lang="pug">
DefaultCardWrapper(title='Доступные Бои')
  // CREATE GAME
  BaseDialogWrapper(
    v-model='newGameDialogData.display',
    title='Забить Новую Стрелку'
  )
    NewGameForm(ref='newGameFormRef', v-model='newGameDialogData.value')
    v-row
      v-col(cols='12')
        v-btn.text-subtitle-1(@click='saveGame') Забить
      v-col(cols='12')
        v-btn.text-subtitle-1(
          variant='outlined',
          @click='newGameDialogData.display = false'
        ) Ну Нах

  // PAGE
  v-row
    v-col(cols='12')
      v-list.bg-primary.rounded-lg.pa-1
        v-list-item.my-2.bg-white.rounded-lg(
          v-for='(game, index) in games.data',
          :key='index',
          width='100%'
        )
          v-row(align='center', no-gutters)
            v-col(cols='auto')
              p.text-h6.font-weight-bold {{ game.name }}
            v-spacer
            v-col(cols='auto')
              v-btn.text-subtitle-2(height='20px') Явится На Стрелку
            v-col.pl-1(v-if='game.hostId === playerId', cols='auto')
              v-btn.text-subtitle-2(
                height='20px',
                color='red',
                variant='outlined',
                @click='deleteGame(game._id)'
              ) Слиться
  v-row
    v-col(cols='12')
      v-btn.text-subtitle-1(color='primary', @click='createNewGame') Забить Стрелку
      //v-btn.text-subtitle-1(@click='navigateTo("/characters")') К Выбору Бойца
      //p {{ character$.data.who }}
      //v-avatar(size='x-large')
      //  v-img(:src='character$.data.avatar', alt='Аватарка пользователя')
  //DefaultCardWrapper.d-flex.align-center.justify-center(
  //  v-if='character$.data',
  //  title='Выбранный боец'
  //)
  //  v-row
  //    v-col(cols='12')
  //      v-btn.text-h6(@click.prevent='navigateTo("/characters")') К выбору Героя
  //      p {{ character$.data.who }}
  //      v-avatar(size='x-large')
  //        v-img(:src='character$.data.avatar', alt='Аватарка пользователя')
  //DefaultCardWrapper(title='Создайте или выберите лобби')
  //  v-row
  //    v-col.align-center.justify-center(cols='12', xs='12')
  //        DefaultCardWrapper(title='Enter the name of the lobby')
  //          v-container
  //          v-btn(
  //            color='blue-darken-1',
  //            variant='text',
  //            @click='dialog = false'
  //          ) Close
</template>

<script setup lang="ts">
const { api } = useFeathers()
const snackbar = useSnackbarStore()
const { playerId } = useAuthStore()
const route = useRoute()

const newGameFormRef = ref()

const newGameDialogData = reactive<IDialogData>({
  display: false,
  value: null,
})

const gamesQuery = computed(() => ({
  query: {
    $or: [
      {
        hostId: playerId,
      },
      ...(route.query.enemy === 'all'
        ? [
            {
              whoHostCharacter: 'warrior',
            },
            {
              whoHostCharacter: 'mage',
            },
          ]
        : [
            {
              whoHostCharacter: route.query.enemy,
            },
          ]),
    ],
    enemyId: null,
    $limit: 100,
  },
}))
const games = api.service('game').useFind(gamesQuery, { paginateOn: 'server' })

const characterId = computed(() => route.params.id)
const character$ = api.service('characters').useGet(characterId)

const createNewGame = () => {
  newGameDialogData.value = api.service('game').new()
  newGameDialogData.display = true
}

const saveGame = async () => {
  try {
    const { valid } = await newGameFormRef.value.validate()
    if (valid) {
      newGameDialogData.value.hostId = playerId
      newGameDialogData.value.hostCharacterId = character$.data._id
      newGameDialogData.value.whoHostCharacter = character$.data.who
      await newGameDialogData.value.save()
      newGameDialogData.display = false
      snackbar.open('success', 'Стрелка Забита')
    }
  } catch (error: any) {
    snackbar.open('error', error.message)
  }
}

const deleteGame = async (id: string) => {
  try {
    await api.service('game').remove(id)
  } catch (error) {
    snackbar.open('error', error.message)
  }
}

// const form = ref()
// const dialog = ref(false)
// const valid = ref(true)
// const game = ref()

//

// const deleteBtn = async (id: string) => {
//   console.log(id)
// }
//
// const menuDialogData = reactive<IDialogData>({
//   display: false,
//   value: null,
// })
//
// const openGovno = () => {
//   menuDialogData.display = true
// }
</script>

<style scoped lang="scss"></style>
