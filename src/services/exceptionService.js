import Vue from 'vue'
import store from '@/store'

import { networkService as network } from '@/services'

export const exceptionService = {
  start() {
    this.promise()
    this.window()
    this.vue()
  },
  promise() {
    console.log('start handle promise errors')
    const self = this
    window.addEventListener('unhandledrejection', function(err) {
      console.log(err)
      self.handle(err.reason.message)
    })
  },
  window() {
    console.log('start handle window errors')
    window.onerror = function(msg, url, line, col, error) {
      console.log('javascript error handler fired')
      console.log(msg, url, line, col, error)
    }
  },
  vue() {
    console.log('start handle vue errors')
    Vue.config.errorHandler = function(err, vm, info) {
      console.log('vue error handler fired')
      console.log(err, vm, info)
      // self.handle(err.message)
    }
  },
  handle(message) {
    store.commit('notification/show', {
      message: `An error was encounterd: ${message}`,
      color: 'error',
      timeout: 7500,
    })
  },
}
