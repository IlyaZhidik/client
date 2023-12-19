import { acceptHMRUpdate, defineStore } from 'pinia'
import { type NullableId } from '@feathersjs/feathers'

interface AuthenticateData {
  strategy: 'local'
  email: string
  password: number
}

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const servicePath = ref('players')
  const entityKey = ref('player')

  // external flow
  const promise = ref<Record<string, any>>({})

  // user
  const playerId = ref<NullableId>(null)
  const player = computed<Instance<IPlayer>>(() => {
    const entityService = servicePath.value
      ? api.service(servicePath.value)
      : null
    if (!entityService) return null
    const u = entityService.getFromStore(playerId)
    return u.value || null
  })

  // error
  const error = ref<Error | null>(null)
  const clearError = () => (error.value = null)

  // authenticate
  const authCounter = useCounter()
  const isPending = computed(() => !!authCounter.count.value)
  const isAuthenticated = ref(false)

  const handleAuthResult = (result: any) => {
    const entity = result[entityKey.value]
    const entityService = api.service(servicePath.value)
    if (entityService && entity) {
      const stored = entityService.store.createInStore(entity)
      playerId.value = stored[entityService.store.idField] || stored.__tempId
    }
    isAuthenticated.value = true
    return result
  }

  const authenticate = async (data: AuthenticateData) => {
    authCounter.inc()
    clearError()
    try {
      const response = await api.authenticate(data)
      handleAuthResult(response)
      promise.value = response
      return response
    } catch (error: any) {
      error.value = error
      promise.value = error
      throw error
    } finally {
      authCounter.dec()
    }
  }

  // token check

  const isInitDone = ref(false)
  const reAuthenticate = async () => {
    authCounter.inc()
    try {
      const response = await api.reAuthenticate()
      handleAuthResult(response)
      promise.value = response
      return response
    } catch (error: any) {
      error.value = error
      promise.value = error
      return
    } finally {
      authCounter.dec()
      isInitDone.value = true
    }
  }

  // logout
  const logoutCounter = useCounter()
  const isLogoutPending = computed(() => !!logoutCounter.count.value)
  const logout = async () => {
    logoutCounter.inc()
    try {
      await api.logout()
      playerId.value = null
      isAuthenticated.value = false
      // promise.value = response
    } catch (error: any) {
      error.value = error
      throw error
    } finally {
      logoutCounter.dec()
    }
  }

  return {
    servicePath,
    playerId,
    player,
    error,
    isPending,
    isLogoutPending,
    isInitDone,
    isAuthenticated,
    getPromise: () => promise.value,
    authenticate,
    reAuthenticate,
    logout,
    clearError,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
