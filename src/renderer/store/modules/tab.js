const state = {
  tabMap: {},
  currentTab: {
    tabName: 'command',
    tableData: null,
    message: null
  }
}

const mutations = {
  OPEN_TAB (state, {tabName, tableData, message}) {
    if (state.tabMap[tabName] !== null && state.tabMap[tabName] !== undefined) {
      tableData = tableData === null || tableData === undefined ? state.tabMap[tabName].tableData : tableData
      if (tableData === null) {
        message = message === null || message === undefined ? state.tabMap[tabName].message : message
      }
    }
    state.tabMap[tabName] = {tabName, tableData, message}
    state.currentTab = {tabName, tableData, message}
  },
  CLOSE_TAB (state, tabName) {
    if (state.currentTab.tabName === tabName) {
      for (let name in state.tabMap) {
        if (name !== tabName) {
          state.currentTab = state.tabMap[name]
        }
      }
    }
    if (state.tabMap[tabName] !== null) {
      delete state.tabMap[tabName]
    }
  }
}

const actions = {
  openTab ({commit}, {tabName, tableData, message}) {
    commit('OPEN_TAB', {tabName, tableData, message})
  },
  closeTab ({commit}, tabName) {
    commit('CLOSE_TAB', tabName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
