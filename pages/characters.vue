<template lang="pug">
DefaultCardWrapper(title='Мои Бойцы')
  // SELECT CHARACTER
  BaseDialogWrapper(
    v-model='selectEnemyDialogData.display',
    title='Кому ебало бить?'
  )
    SelectEnemyForm(
      ref='selectEnemyFormRef',
      v-model='selectEnemyDialogData.value.selectedEnemy'
    )
    v-row
      v-col(cols='12')
        v-btn.text-subtitle-1(@click='selectEnemy') Ломануться
    v-row
      v-col(cols='12')
        v-btn.text-subtitle-1(
          variant='outlined',
          @click='selectEnemyDialogData.display = false'
        ) ПНХ

  // CREATE CHARACTER
  BaseDialogWrapper(
    v-model='newCharacterDialogData.display',
    :title='newCharacterDialogData.value?.__isClone ? "Мой Боец" : "Новый Боец"'
  )
    CharacterForm(
      ref='characterFormRef',
      v-model='newCharacterDialogData.value'
    )
    v-row
      v-col(cols='12')
        v-btn.text-subtitle-1(@click='saveCharacter') {{ newCharacterDialogData.value?.__isClone ? 'Прокачать' : 'Нанять' }}
      v-col(cols='12')
        v-btn.text-subtitle-1(
          variant='outlined',
          @click='newCharacterDialogData.display = false'
        ) ПНХ

  // PAGE
  v-row
    v-col
      template(v-if='characters$.data.length')
        v-row(no-gutters)
          template(
            v-for='(character, index) in characters$.data',
            :key='index'
          )
            v-col.position-relative.border-xl(
              cols='6',
              @mouseenter='character.displayBtns = true',
              @mouseleave='character.displayBtns = false'
            )
              v-img(
                :src='character.avatar',
                :draggable='false',
                style='cursor: pointer'
              )
              v-scale-transition
                template(v-if='character.displayBtns')
                  v-row.position-absolute(
                    no-gutters,
                    style='top: 50%; left: 50%; z-index: 10; transform: translate(-50%, -50%)'
                  )
                    v-col
                      v-btn.text-subtitle-1(
                        color='primary',
                        alt='Выбрать героя',
                        @click='selectCharacter(character._id)'
                      ) Выбрать Бойца
                    v-col.mt-3
                      v-btn.text-subtitle-1(
                        color='primary',
                        variant='outlined',
                        @click='editCharacter(character)'
                      ) Прокачать Бойца
                    v-col.mt-3
                      v-btn.text-subtitle-1(
                        @click='deleteCharacter(character)'
                      ) Уволить Бойца
      template(v-else)
        h4.text-primary.text-h5.font-weight-bold Бойцов не завезли
  v-row
    v-col.text-center
      v-btn.text-subtitle-1(color='primary', @click='createCharacter') Нанять Нового Бойца
</template>

<script setup lang="ts">
const { api } = useFeathers()
const snackbar = useSnackbarStore()

const characterFormRef = ref()
const selectEnemyFormRef = ref()

const newCharacterDialogData = reactive<IDialogData>({
  display: false,
  value: null,
})
const selectEnemyDialogData = reactive<IDialogData>({
  display: false,
  value: {
    selectedCharacterId: '',
    selectedEnemy: '',
  },
})

const charactersQuery = computed(() => ({
  query: {
    $limit: 10,
  },
}))
const characters$ = api
  .service('characters')
  .useFind(charactersQuery, { paginateOn: 'server' })

const selectCharacter = (id: string) => {
  selectEnemyDialogData.display = true
  selectEnemyDialogData.value.selectedCharacterId = id
}

const selectEnemy = async () => {
  const { valid } = await selectEnemyFormRef.value.validate()
  if (!valid) return snackbar.open('error', 'Выбери Противника')
  navigateTo({
    path: `/menu/${selectEnemyDialogData.value.selectedCharacterId}`,
    query: {
      enemy: selectEnemyDialogData.value.selectedEnemy,
    },
  })
}

const createCharacter = () => {
  newCharacterDialogData.display = true
  newCharacterDialogData.value = api.service('characters').new()
}

const editCharacter = (character: ICharacter) => {
  newCharacterDialogData.display = true
  newCharacterDialogData.value = character.clone()
}

const deleteCharacter = async (character: ICharacter) => {
  try {
    await api.service('characters').remove(character._id)
    snackbar.open('success', `${character.who.toUpperCase()} БЫЛ УВОЛЕН!`)
  } catch (e: any) {
    snackbar.open('error', e.message)
  }
}
const saveCharacter = async () => {
  try {
    const { valid } = await characterFormRef.value.validate()
    if (valid) {
      await newCharacterDialogData.value.save()
      newCharacterDialogData.display = false
    }
  } catch (error: any) {
    snackbar.open('error', error.message)
  }
}
</script>

<style scoped lang="scss"></style>
