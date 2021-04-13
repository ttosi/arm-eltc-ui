const state = () => ({
  activeFile: {},
  files: [],
  fields: [],
  name: '',
  isLocked: false,
})

const mutations = {
  setActive(state, data) {
    state.activeFile = data
  },
  addFile(state, data) {
    state.files.push(data)
  },
  setFiles(state, data) {
    state.files = data
  },
  setFields(state, data) {
    state.fields = data
  },
  setConfig(state, data) {
    state.name = data.name
    state.isLocked = data.isLocked
  },
}

const getters = {
  getActiveFile: (state) => {
    return state.activeFile
  },
  getFiles: (state) => {
    return state.files
  },
  getFields: (state) => {
    return state.fields
  },
  getDetails: (state) => {
    return {
      name: state.name,
      isLocked: state.isLocked,
    }
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
