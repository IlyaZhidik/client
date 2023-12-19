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
    validatePlayerName: (value: string) => {
      if (value?.length > 3) {
        return true
      }
      return 'Имя должно быть больше трех символов'
    },
    validatePlayerMail: (value: string) => {
      const regex = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
      if (regex.test(value)) {
        return true
      }
      return 'Введите правильный Эмейл'
    },
    validatePlayerPass: (value: string) => {
      const regex = /.*[A-Z].*/
      if (regex.test(value)) {
        return true
      }
      return 'Пароль должен содержать хотябы 1 заглавную букву в  верхнем регистре'
    },
    validatePlayerGender: (value: string) => {
      if (value) {
        return true
      }
      return 'Выберите свой пол'
    },
    required: (value: any) => {
      return !!value || 'Обязательное!!'
    },
  }
  return { rules }
}
