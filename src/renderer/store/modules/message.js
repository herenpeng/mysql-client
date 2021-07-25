const state = {
  message: {}
}

const mutations = {
  SET_MESSAGE (state, tableName, message) {
    state.message[tableName] = message
  }
}

const actions = {
  setMessage ({commit}, tableName, message) {
    commit('SET_MESSAGE', tableName, message)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
