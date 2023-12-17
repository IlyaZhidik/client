<template lang="pug">
v-row(align='center', no-gutters)
  v-spacer
  v-col(cols='11', sm='10', md='8', lg='7', xl='6')
    v-card.bg-secondary.pa-10(width='100%')
      v-row
        v-col.text-center
          p.text-sm-h2.text-h4.font-weight-bold.text-red Select hero
          v-list.bg-primary.rounded-lg.pa-1
            v-list-item.my-2.bg-white.rounded-lg(
              v-for='(character, index) in characters.data',
              :key='index',
              width='100%'
            )
              v-dialog(v-model='dialog1', persistent, width='600')
                v-card.bg-secondary.pa-10(width='100%')
                  v-row
                    v-col.text-center
                      v-form
                        v-row
                          v-col
                            p сменить изображение
                            v-dialog(
                              v-model='dialog2',
                              persistent,
                              width='600'
                            )
                              v-card.bg-secondary.pa-10(width='100%')
                                v-row
                                  v-col.text-center
                                    v-form(
                                      v-model='valid',
                                      @submit.prevent='createCharacter'
                                    )
                                      v-row
                                        v-col
                                          v-text-field(
                                            type='file',
                                            :rules='[validateFile]'
                                          )
                                          v-btn.text-subtitle-1(type='submit') Изменить аватар
                                    v-btn.text-subtitle-1.d-flex.justify-end(
                                      @click='dialog2 = false'
                                    ) Назад
                            v-avatar(
                              size='x-large',
                              title='Изменить изображение',
                              @click='dialog2 = true'
                            )
                              v-img(
                                :src='selectedCharacter.avatar',
                                alt='Аватарка пользователя',
                                style='width: 100%, height=auto'
                              )

                            p опыт: {{ selectedCharacter.exp }}
                            .healthbar.border-solid.ma-1.bg-white(
                              style='height: 10px'
                            )
                              .healthbar_value.border-solid.bg-red(
                                style='height: 100%',
                                :style='{ width: experiencePercent }'
                              )
                          v-col
                            p Количество игр: {{ selectedCharacter.games }}
                            p Количество побед: {{ selectedCharacter.wins }}
                            div
                              p {{ selectedCharacter.who }}
                              v-btn изменить класс
                          v-col
                            p уровень: {{ selectedCharacter.lvl }}
                            p очки характеристик: {{ selectedCharacter.powerPoints }}
                            p сила: {{ selectedCharacter.strength }}
                            p выносливость: {{ selectedCharacter.stamina }}
                          v-col.d-flex.align-center.justify-center(cols='12')
                            v-btn.text-subtitle-1(@click='dialog1 = false') назад
              v-avatar(size='x-large', title='Характеристики')
                v-img(
                  v-if='character.avatar',
                  :src='character.avatar',
                  alt='Аватарка пользователя',
                  style='width: 100%, height=auto',
                  @click='selectCharacter(character)'
                )
              template(#append)
                v-btn.text-subtitle-1(
                  color='red',
                  @click='deleteBtn(character._id)'
                ) Удалить героя
          v-dialog(v-model='dialog', persistent, width='600')
            template(#activator='{ props }')
              v-btn.text-subtitle-1(
                color='primary',
                v-bind='props',
                width='100%',
                height='40',
                @click='player = api.service("characters").new({})'
              ) Create Hero
            v-card.bg-secondary.pa-10(width='100%')
              v-row
                v-col.text-center
                  v-form(
                    ref='form',
                    v-model='valid',
                    @submit.prevent='createCharacter'
                  )
                    v-row
                      v-col(cols='12')
                        v-text-field(
                          v-model='player.avatar',
                          type='text',
                          :rules='[validateImageUrl]',
                          label='Название'
                        )
                      v-col
                        .text-caption
                        v-select(
                          v-model='player.who',
                          label='class',
                          :items='["warrior", "mage"]',
                          :rules='[validateClass]'
                        )
                      v-col
                        p распределите начальные параметры силы и выносливости
                        v-slider(
                          v-model='slider1',
                          thumb-label,
                          min='0',
                          max='150',
                          :step='1'
                        )
                        div Сила: {{ slider1 }}
                        div Выносливость: {{ 150 - slider1 }}
                      v-col.d-flex.align-center.justify-center(cols='12')
                        v-btn.text-subtitle-1(type='submit') Создать героя
                        v-btn.text-subtitle-1(
                          color='blue-darken-1',
                          variant='text',
                          @click='dialog = false'
                        ) Close
                        v-avatar(size='x-large')
                          v-img(
                            v-if='player.avatar',
                            :src='player.avatar',
                            alt='Аватарка пользователя',
                            style='width: 100%, height=auto'
                          )
  v-spacer
</template>

<script setup lang="ts">
const slider1 = ref(1)
const dialog = ref(false)
const dialog1 = ref(false)
const dialog2 = ref(false)
const form = ref()
const imageUrl = ref()
const valid = ref(true)
const { api } = useFeathers()
const player = ref()
const powerPoints = ref()
const selectedCharacter = ref()
// const charactersQuery = computed(() => '657b5f252332b21576af296e')
const experiencePercent = computed(
  (): number => (selectedCharacter.exp / 10) * 100,
)
const staminaValue = computed((): number => 150 - slider1.value)
const charactersQuery = computed(() => ({
  query: {
    $limit: 10,
  },
}))
const characters = api
  .service('characters')
  .useFind(charactersQuery, { paginateOn: 'server' })

watchEffect(() => {
  // console.log(characters.data)
})
const selectCharacter = (character) => {
  selectedCharacter.value = character
  dialog1.value = true
}
const zxc = (): number => characters.data[0].strength + 1
const validateImageUrl = (url: string): boolean => {
  if (url) {
    return true
  }
  return 'Введите корректный Url'
}
const createCharacter = async () => {
  try {
    const { valid } = await form.value.validate()
    if (valid) {
      player.value.strength = slider1
      player.value.stamina = staminaValue
      const res = await player.value.save()
      dialog.value = false
    }
  } catch (e) {
    console.log(e)
  }

  //   const characters = api
  //     .service('characters')
  //     .useFind(charactersQuery, { paginateOn: 'server' })
}
const deleteBtn = async (id: string) => {
  try {
    await api.service('characters').remove(id)
  } catch (e) {
    console.log(e)
  }
}
const validateClass = (url: string): boolean => {
  if (url === 'mage' || 'warrior') {
    return true
  }
  return 'Выберите класс'
}

const validateFile = (value: string) => {
  if (value) {
    return true
  }
  return 'Выберите подходящий тип файла'
}
</script>

<style scoped lang="scss"></style>
