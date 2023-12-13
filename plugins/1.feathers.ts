import { createClient } from 'feathers-api'
import { createPiniaClient } from 'feathers-pinia'

import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

/**
 * Creates a Feathers Rest client for the SSR server and a Socket.io client for the browser.
 * Also provides a cookie-storage adapter for JWT SSR using Nuxt APIs.
 */
export default defineNuxtPlugin((nuxt) => {
  const host = 'http://localhost:3030'
  // Store JWT in a cookie for SSR.
  const storageKey = 'feathers-jwt'

  // Use Rest for the SSR Server and socket.io for the browser
  const connection = socketio(io(host, { transports: ['websocket'] }))

  // create the feathers client
  const feathersClient = createClient(connection, {
    storageKey,
  })

  // wrap the feathers client
  const api = createPiniaClient(feathersClient, {
    pinia: nuxt.$pinia,
    ssr: false,
    idField: '_id',
    whitelist: [],
    paramsForServer: [],
    skipGetIfExists: true,
    customSiftOperators: {},
    services: {
      players: {
        setupInstance(data: any) {
          const defaults = {
            email: '',
          }
          return useInstanceDefaults(defaults, data)
        },
      },
    },
  })

  return { provide: { api } }
})
