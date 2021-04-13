import VueCookie from 'vue-cookie'
import store from '@/store'
import { networkService as network } from '@/services'

export const authService = {
  login(username, password) {
    return new Promise((resolve, reject) => {
      const request = { email: username, password: password }
      network
        .post(`/auth/login`, request)
        .then((data) => {
          VueCookie.set('authenticated', 'true', 1)
          localStorage.setItem('user', JSON.stringify(data))
          store.commit('user/set', data.user)
          store.commit('authentication/set', {
            authenticated: true,
            token: data.token,
          })
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      store.commit('authentication/set', false)
      VueCookie.delete('authenticated')
      localStorage.removeItem('user')
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  },
}
