const state = () => ({
  show: false,
  content: '',
  title: '',
  action: '',
  data: {},
})

const mutations = {
  show(state, payload) {
    state.show = true
    state = Object.assign(state, payload)
  },
  hide(state, payload) {
    state.show = payload.show
  },
}

const getters = {
  getData: (state) => {
    return state
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
