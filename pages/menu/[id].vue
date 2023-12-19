<template lang="pug">
div
  DefaultCardWrapper.d-flex.align-center.justify-center(
    v-if='character$.data',
    title='Выбранный боец'
  )
    v-row
      v-col(cols='12')
        v-btn.text-h6(@click.prevent='navigateTo("/characters")') К выбору Героя
        p {{ character$.data.who }}
        v-avatar(size='x-large')
          v-img(:src='character$.data.avatar', alt='Аватарка пользователя')
  DefaultCardWrapper(title='Создайте или выберите лобби')
    v-row
      v-col.align-center.justify-center(cols='12', xs='12')
        v-list.bg-primary.rounded-lg.pa-1
          v-list-item.my-2.bg-white.rounded-lg(
            v-for='(game, index) in games.data',
            :key='index',
            width='100%'
          )
            template.text-center(#append)
              v-btn.text-center(color='red', @click='deleteBtn(game._id)') Удалить
              p Присоедениться: {{ game.name }}
    v-row
      v-col(cols='12')
        v-dialog(v-model='dialog', persistent, width='600')
          template(#activator='{ props }')
            v-btn(
              color='primary',
              v-bind='props',
              width='100%',
              height='40',
              @click='game = api.service("game").new({})'
            ) New Game
          DefaultCardWrapper(title='Enter the name of the lobby')
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
            v-btn(
              color='blue-darken-1',
              variant='text',
              @click='dialog = false'
            ) Close
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

const route = useRoute()
const id = computed(() => route.params.id)
const character$ = api.service('characters').useGet(id)
const createNewGame = async () => {
  try {
    const { valid } = await form.value.validate()
    if (valid) {
      console.log(game.value)
      game.value.hostId = playerId
      await game.value.save()
      dialog.value = false
      navigateTo('/game')
    }
  } catch (e) {
    console.log(e)
  }
}
const {
  rules: { validateName },
} = useValidation()
const deleteBtn = async (id: string) => {
  console.log(id)
  try {
    await api.service('game').remove(id)
  } catch (e) {
    console.log(e)
  }
}

const menuDialogData = reactive<IDialogData>({
  display: false,
  value: null,
})

const openGovno = () => {
  menuDialogData.display = true
}
</script>

<style scoped lang="scss"></style>
