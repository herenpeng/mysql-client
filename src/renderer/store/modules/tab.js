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
  },
  CLICK_TAB (state, tabName) {
    state.currentTab = state.tabMap[tabName]
  }
}

const actions = {
  openTab ({commit}, {tabName, tableData, message}) {
    commit('OPEN_TAB', {tabName, tableData, message})
  },
  closeTab ({commit}, tabName) {
    commit('CLOSE_TAB', tabName)
  },
  clickTab ({commit}, tabName) {
    commit('CLICK_TAB', tabName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
