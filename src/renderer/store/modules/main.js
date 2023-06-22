const state = {
  databaseName: null
}

const mutations = {
  SET_DATABASE_NAME (state, databaseName) {
    state.databaseName = databaseName
  },
  CLOSE_DATABASE (state) {
    state.databaseName = null
  }
}

const actions = {
  setDatabaseName ({commit}, databaseName) {
    commit('SET_DATABASE_NAME', databaseName)
  },
  closeDatabase ({commit}) {
    commit('CLOSE_DATABASE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
