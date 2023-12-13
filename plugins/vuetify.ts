import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import * as labsComponents from 'vuetify/labs/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'ilyxa',
      themes: {
        ilyxa: {
          dark: false,
          colors: {
            error: '#B00020',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
            primary: '#20B2AA',
            secondary: '#F0E68C',
          },
        },
      },
    },
    components: { ...components, ...labsComponents },
    directives,
    defaults: {},
  })

  nuxtApp.vueApp.use(vuetify)
})
