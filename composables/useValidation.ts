export const useValidation = () => {
  const rules = {
    validateClass: (value: string) => {
      return !!value || 'Выберите класс'
    },
    validateImage: (value: string, avatar: any) => {
      return (
        typeof avatar === 'string' || !!value.length || 'Отсутствует аватар'
      )
    },
    validateName: (value: string) => {
      if (value?.length > 3) {
        return true
      }
      return 'Имя должно быть больше трех символов'
    },
  }
  return { rules }
}
