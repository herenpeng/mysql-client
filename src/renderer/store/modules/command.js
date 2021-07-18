const state = {
  showCommand: false
}

const mutations = {
  OPEN_COMMAND (state) {
    state.showCommand = true
  },
  CLOSE_COMMAND (state) {
    state.showCommand = false
  }
}

const actions = {
  openCommand ({commit}) {
    commit('OPEN_COMMAND')
  },
  closeCommand ({commit}) {
    commit('CLOSE_COMMAND')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
