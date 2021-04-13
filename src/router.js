import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import VueCookie from 'vue-cookie'

import { NotFound } from '@/views'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/Login') },
    { path: '/', name: 'home', component: () => import('@/views/Home') },
    { path: '/wizard', name: 'wizard', component: () => import('@/views/Wizard') },
    { path: '/configuration/:id', name: 'configuration', component: () => import('@/views/Configuration') },
    {
      path: '*',
      name: 'notfound',
      component: NotFound,
      beforeEnter: (to, from, next) => {
        next()
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const skipAuthentication = new Set(['login', 'notfound', 'home', 'configuration']) // routes to ignore authing
  const isAuthenticated = store.state.authentication.isAuthenticated
  const isCookieAuthed = VueCookie.get('authenticated') === 'true'

  // if the user's state is authenticated or a cookie called
  // authenticated is present (for page refreshes) direct
  // to requested view. Otherwise redirect to login view
  if ((isAuthenticated || isCookieAuthed) && !skipAuthentication.has(to.name)) {
    if (!isAuthenticated && !skipAuthentication.has(to.name)) {
      // need to set auth state if getting here from auth cookie
      const data = JSON.parse(localStorage.getItem('user'))
      store.commit('user/set', data.user)
      store.commit('authentication/set', {
        authenticated: true,
        token: data.token,
      })
    }
    next()
  } else {
    // if user isn't coming from login view redirect to it
    // otherwise just call next()
    if (!from.name && !skipAuthentication.has(to.name)) {
      next('/login')
    }
    next()
  }
})

export default router
