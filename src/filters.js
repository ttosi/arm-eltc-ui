import Vue from 'vue'

Vue.filter('formatDate', (date) => {
  return date
  // return date.format('{dd}-{mon}-{yyyy} {hh}:{mm} {tt}').toUpperCase();
})
