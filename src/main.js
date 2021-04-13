import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/vuetify'
import './filters'
import { exceptionService as exception } from '@/services'

Vue.config.productionTip = false

exception.start()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
