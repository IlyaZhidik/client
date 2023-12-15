import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useSnackbarStore = defineStore('snackbar', () => {
  // other options...
  const snackbar = ref(false)
  const text = ref()
  const color = ref()
  const timeout = ref()
  const open = (type: 'error' | 'success', message: string) => {
    if (type === 'error') {
      color.value = 'error'
      timeout.value = 4000
    }
    if (type === 'success') {
      color.value = 'success'
      timeout.value = 1000
    }
    text.value = message
    snackbar.value = true
  }
  return { snackbar, text, color, timeout, open }
})
