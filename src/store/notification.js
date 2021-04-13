const state = () => ({
  show: false,
  message: '',
  color: 'success',
  timeout: 2500,
})

const mutations = {
  show(state, payload) {
    state = Object.assign(state, payload)
    state.show = !state.show
  },
  hide(state, payload) {
    state.show = payload.show
  },
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
