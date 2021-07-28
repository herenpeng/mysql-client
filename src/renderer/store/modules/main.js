const state = {
  showCommand: false,
  databaseName: null,
  tabNames: [],
  currentTab: 'command',
  tableDataMap: {},
  tableData: null
}

const mutations = {
  OPEN_COMMAND (state) {
    state.showCommand = true
    state.currentTab = 'command'
  },
  CLOSE_COMMAND (state) {
    state.showCommand = false
    if (state.tabNames.length > 0) {
      state.currentTab = state.tabNames[0]
    } else {
      state.currentTab = 'command'
    }
  },
  SET_DATABASE_NAME (state, databaseName) {
    state.databaseName = databaseName
  },
  CLOSE_DATABASE (state) {
    state.databaseName = null
  },
  ADD_TABLE_NAME (state, tableName) {
    if (state.tabNames.indexOf(tableName) === -1) {
      state.tabNames.push(tableName)
    }
    state.currentTab = tableName
  },
  DELETE_TABLE_NAME (state, tableName) {
    state.tabNames.forEach((table, index) => {
      if (table === tableName) {
        state.tabNames.splice(index, 1)
        state.tableDataMap[tableName] = null
      }
    })
    if (state.currentTab === tableName) {
      if (state.tabNames.length > 0) {
        state.currentTab = state.tabNames[0]
      } else {
        state.currentTab = 'command'
      }
    }
  },
  SET_TABLE_DATA (state, {tableName, tableData}) {
    state.tableDataMap[tableName] = tableData
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
  setTableData ({commit}, {tableName, tableData}) {
    commit('SET_TABLE_DATA', {tableName, tableData})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
