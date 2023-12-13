export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-feathers-pinia'],

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
      title: 'fight-club ',
    },
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/main.sass',
  ],
  build: {
    transpile: ['vuetify'],
  },
  components: {
    global: true,
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  imports: {
    dirs: [
      'composables/**',
      'services/**',
      'models/**',
      'stores/**',
      'lib/**',
      'router/**',
    ],
  },
  ssr: false,
  typescript: {
    shim: false,
  },
  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },
  // alias: {
  //   assets: '/<rootDir>/assets',
  // },
})
