<template lang="pug">
DefaultCardWrapper(title='Select Hero')
  BaseDialogWrapper(v-model='characterDialogData.display')
    CharacterForm(ref='characterFormRef', v-model='characterDialogData.value')
    template(#actions)
      v-row
        v-col.d-flex.align-center.justify-center(cols='12')
          v-btn.text-subtitle-1(@click='save') Сохранить
        v-col.d-flex.align-center.justify-center(cols='12')
          v-btn.text-subtitle-1(@click='characterDialogData.display = false') Закрыть
  v-row
    v-col.text-center(cols='12')
      template(v-if='characters$.data.length')
        v-list.bg-primary.rounded-lg.pa-1
          template(
            v-for='(character, index) in characters$.data',
            :key='index'
          )
            v-list-item.my-2.bg-white.rounded-lg
              template(#prepend)
                v-avatar(size='x-large')
                  v-img(
                    :src='character.avatar',
                    alt='Аватарка пользователя',
                    @click='editCharacter(character)'
                  )
              template(#default)
                v-btn.text-subtitle-1(
                  color='primary',
                  alt='Выбрать героя',
                  @click='openGovno(character)'
                ) Select
                BaseDialogWrapper(v-model='menuDialogData.display')
                  template(#actions)
                    h4.text-red.text-h4.font-weight-bold Выбери класс соперника
                    v-row
                      v-col
                        v-select(
                          v-model='enemySelect',
                          label='Выбери соперника',
                          :items='whoItems',
                          item-title='label',
                          item-value='value',
                          :rules='[validateClass]'
                        )
                      v-row
                        v-col.d-flex.align-end.justify-end(cols='12')
                          v-btn.text-subtitle-1(
                            @click='selectCharacter(menuDialogData.value)'
                          ) Выбрать
                          v-btn.text-subtitle-1(
                            @click='menuDialogData.display = false'
                          ) Закрыть
              template(#append)
                v-btn.text-subtitle-1(
                  color='red',
                  @click='deleteCharacter(character)'
                ) Удалить героя
      template(v-else)
        h4.text-primary.text-h5.font-weight-bold No Characters Yet..
  v-row
    v-spacer
    v-col(cols='9')
      v-btn.text-subtitle-1(
        color='primary',
        width='100%',
        height='40',
        @click='createCharacter'
      ) Create Hero
    v-spacer
</template>

<script setup lang="ts">
console.log('zdes')
const { api } = useFeathers()
const snackbar = useSnackbarStore()
const valid = ref(true)
const characterDialogData = reactive<IDialogData>({
  display: false,
  value: null,
})
const enemySelect = ref()
const characterFormRef = ref()
const form = ref()
const charactersQuery = computed(() => ({
  query: {
    $limit: 10,
  },
}))
const characters$ = api
  .service('characters')
  .useFind(charactersQuery, { paginateOn: 'server' })

const createCharacter = () => {
  characterDialogData.display = true
  characterDialogData.value = api.service('characters').new()
}
const editCharacter = (character: ICharacter) => {
  characterDialogData.display = true
  characterDialogData.value = character.clone()
}
const deleteCharacter = async (character: ICharacter) => {
  try {
    await api.service('characters').remove(character._id)
    snackbar.open('success', `${character.who.toUpperCase()} БЫЛ УВОЛЕН!`)
  } catch (e: any) {
    snackbar.open('error', e.message)
  }
}
const save = async () => {
  try {
    const { valid } = await characterFormRef.value.validate()
    if (valid) {
      await characterDialogData.value.save()
      characterDialogData.display = false
    }
  } catch (error: any) {
    snackbar.open('error', error.message)
  }
}

const menuDialogData = reactive<IDialogData>({
  display: false,
  value: null,
})

const openGovno = (character) => {
  menuDialogData.display = true
  menuDialogData.value = character._id
}

const {
  rules: { validateClass },
} = useValidation()

const whoItems = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'Warrior',
    value: 'warrior',
  },
  {
    label: 'Mage',
    value: 'mage',
  },
]
const selectCharacter = async (_id: string) => {
  console.log(_id)
  await navigateTo({
    path: '/menu/' + _id,
  })
}
</script>

<style scoped lang="scss"></style>
