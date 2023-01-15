import { createApp } from 'vue'
import App from './App.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi'
import { mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'


const vuetify = createVuetify({
  components: {
    VDataTable,
    ...components
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      fa,
      mdi,
      md,
      mdiSvg,
    },
  },
  directives
})

createApp(App).use(vuetify).mount('#app')