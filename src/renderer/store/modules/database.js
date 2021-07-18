const state = {
  databaseName: null
}

const mutations = {
  SET_DATABASE_NAME (state, databaseName) {
    state.databaseName = databaseName
  }
}

const actions = {
  setDatabaseName ({commit}, databaseName) {
    commit('SET_DATABASE_NAME', databaseName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
