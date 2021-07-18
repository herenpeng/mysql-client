const state = {
  message: null
}

const mutations = {
  SET_MESSAGE (state, message) {
    state.message = message
  }
}

const actions = {
  setMessage ({commit}, message) {
    commit('SET_MESSAGE', message)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
