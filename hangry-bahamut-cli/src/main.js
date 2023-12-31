import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

createApp(App)
  .use(router)
  .use(vuetify)
  .use(ToastPlugin)
  .use(createPinia())
  .mount('#app')
