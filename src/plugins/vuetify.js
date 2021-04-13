import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#153d69',
    secondary: '#395e86',
    accent: '#f7d366',
    gray: '#beccdc',
    lightgray: '#e4e9f3',
    danger: '#e9494f',
  },
})
