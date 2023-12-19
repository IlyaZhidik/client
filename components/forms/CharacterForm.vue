<template lang="pug">
v-form(ref='formRef', @submit.prevent)
  v-row
    v-col(cols='12')
      v-avatar(size='x-large')
        v-img(v-if='character.avatar', :src='character.avatar')
    v-col(cols='12')
      v-file-input(
        v-model='avatarFile',
        label='Avatar',
        :rules='[(e) => validateImage(e, character.avatar)]',
        placeholder='Pick an avatar',
        prepend-icon='mdi-camera',
        accept='image/png, image/jpeg, image/bmp'
      )
    v-col
      v-select(
        v-model='character.who',
        label='class',
        :items='whoItems',
        item-title='label',
        item-value='value',
        :rules='[validateClass]'
      )
  v-row
    v-col
      p распределите начальные параметры силы и выносливости
      v-slider(
        v-model='sliderStart',
        thumb-label,
        min='0',
        :max='maxSliderValue',
        :step='1',
        @update:model-value='sliderHandler'
      )
      p Сила: {{ character.strength }}
      p Выносливость: {{ character.stamina }}
    template(v-if='character.__isClone')
      v-row
        v-col.text-center
          p.text-subtitle-2 Количество побед: {{ character.wins }}
          p.text-subtitle-2 Количество сыгранных игр: {{ character.games }}
          p.text-subtitle-2 Доступные очки: {{ character.powerPoints }}
          p.text-subtitle-2 Уровень героя: {{ character.lvl }}
          p.text-subtitle-2 Полученный опыт: {{ character.exp }} / 100
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: ICharacter
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: ICharacter): void
}>()

const {
  rules: { validateImage, validateClass },
} = useValidation()

const formRef = ref()
const avatarFile = ref([])

const character = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const maxSliderValue = ref(
  character.value.stamina +
    character.value.strength +
    character.value.powerPoints,
)
const sliderStart = ref(character.value.strength)

const validate = async () => {
  return await formRef.value.validate()
}
const sliderHandler = (value: number) => {
  character.value.strength = value
  character.value.stamina = maxSliderValue.value - character.value.strength
}

watchEffect(() => {
  if (!avatarFile.value || !avatarFile.value.length) {
    return
  }
  const reader = new FileReader()
  reader.readAsDataURL(avatarFile.value[0])
  reader.onload = () => {
    character.value.avatar = reader.result
  }
})

const whoItems = [
  {
    label: 'Warrior',
    value: 'warrior',
  },
  {
    label: 'Mage',
    value: 'mage',
  },
]

defineExpose({ validate })
</script>

<style scoped lang="scss"></style>
