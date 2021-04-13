import Vue from 'vue'
import Vuex from 'vuex'

import authentication from './authentication'
import user from './user'
import notification from './notification'
import modal from './modal'
import configuration from './configuration'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseApiUrl: 'https://etlc-api.arminsight.com/api',
    // baseApiUrl: 'https://localhost:5001/api'
  },
  modules: {
    authentication,
    user,
    notification,
    modal,
    configuration,
  },
})
