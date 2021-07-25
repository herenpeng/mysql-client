const state = {
  showCommand: false,
  databaseName: null,
  tableNames: [],
  defaultTab: 'command',
  tableData: {}
}

const mutations = {
  OPEN_COMMAND (state) {
    state.showCommand = true
    state.defaultTab = 'command'
  },
  CLOSE_COMMAND (state) {
    state.showCommand = false
    if (state.tableNames.length > 0) {
      state.defaultTab = state.tableNames[0]
    }
  },
  SET_DATABASE_NAME (state, databaseName) {
    state.databaseName = databaseName
  },
  CLOSE_DATABASE (state) {
    state.databaseName = null
  },
  ADD_TABLE_NAME (state, tableName) {
    if (state.tableNames.indexOf(tableName) === -1) {
      state.tableNames.push(tableName)
    }
    state.defaultTab = tableName
  },
  DELETE_TABLE_NAME (state, tableName) {
    state.tableNames.forEach((table, index) => {
      if (table === tableName) {
        state.tableNames.splice(index, 1)
        state.tableData[tableName] = null
      }
    })
    if (state.defaultTab === tableName) {
      if (state.showCommand) {
        state.defaultTab = 'command'
      } else if (state.tableNames.length > 0) {
        state.defaultTab = state.tableNames[0]
      }
    }
  },
  SET_TABLE_DATA (state, tableName, tableData) {
    state.tableData[tableName] = tableData
  }
}

const actions = {
  openCommand ({commit}) {
    commit('OPEN_COMMAND')
  },
  closeCommand ({commit}) {
    commit('CLOSE_COMMAND')
  },
  setDatabaseName ({commit}, databaseName) {
    commit('SET_DATABASE_NAME', databaseName)
  },
  closeDatabase ({commit}) {
    commit('CLOSE_DATABASE')
  },
  openTable ({commit}, tableName) {
    commit('ADD_TABLE_NAME', tableName)
  },
  closeTable ({commit}, tableName) {
    commit('DELETE_TABLE_NAME', tableName)
  },
  setTableData ({commit}, tableName, tableData) {
    commit('SET_TABLE_DATA', tableName, tableData)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
