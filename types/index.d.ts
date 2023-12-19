import type { Characters, Players } from 'feathers-api'
import { ServiceInstance } from 'feathers-pinia'

declare global {
  type Instance<T> = ServiceInstance<T, T>

  type IPlayer = Players
  type ICharacter = Characters
  type IGame = Game

  interface IDialogData {
    display: boolean
    value: any
  }
}
