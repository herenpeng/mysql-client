const state = {
  showCommand: false,
  databaseName: null,
  tabNames: [],
  currentTab: 'command',
  tableData: {}
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
  ADD_TAB_NAME (state, tabName) {
    if (state.tabNames.indexOf(tabName) === -1) {
      state.tabNames.push(tabName)
    }
    state.currentTab = tabName
  },
  DELETE_TAB_NAME (state, tabName) {
    state.tabNames.forEach((tab, index) => {
      if (tab === tabName) {
        state.tabNames.splice(index, 1)
        state.tableData[tabName] = null
      }
    })
    if (state.currentTab === tabName) {
      if (state.tabNames.length > 0) {
        state.currentTab = state.tabNames[0]
      } else {
        state.currentTab = 'command'
      }
    }
  },
  SET_TABLE_DATA (state, {tabName, tableData}) {
    state.tableData[tabName] = tableData
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
  openTab ({commit}, tabName) {
    commit('ADD_TAB_NAME', tabName)
  },
  closeTab ({commit}, tabName) {
    commit('DELETE_TAB_NAME', tabName)
  },

  setTableData ({commit}, {tabName, tableData}) {
    commit('SET_TABLE_DATA', {tabName, tableData})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
