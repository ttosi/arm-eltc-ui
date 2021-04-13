const state = () => ({
  isAuthenticated: false,
  token: '',
})

const mutations = {
  set(state, data) {
    state.isAuthenticated = data.authenticated
    state.token = data.token
  },
}

const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated
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
