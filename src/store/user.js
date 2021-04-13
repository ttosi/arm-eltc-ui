const state = () => ({
  FirstName: '',
  LastName: '',
  Email: '',
  Roles: [],
})

const mutations = {
  set(state, user) {
    state = Object.assign(state, user)
  },
}

const getters = {
  get: (state) => {
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
