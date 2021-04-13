import VueCookie from 'vue-cookie'
import store from '@/store'
import { authService as auth } from '@/services'

export const userService = {
  load() {
    if (VueCookie.get('authenticated') !== 'true') {
      auth.logout()
      return
    }
  },
}
