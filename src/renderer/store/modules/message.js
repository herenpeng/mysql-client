const state = {
  message: {}
}

const mutations = {
  SET_MESSAGE (state, {tabName, message}) {
    state.message[tabName] = message
  }
}

const actions = {
  setMessage ({commit}, {tabName, message}) {
    commit('SET_MESSAGE', {tabName, message})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
