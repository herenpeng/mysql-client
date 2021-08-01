const state = {
  tabNames: [],
  tabMap: {},
  currentTab: {
    tabName: 'command',
    tableData: null,
    message: null
  }
}

const mutations = {
  OPEN_TAB (state, {tabName, tableData, message}) {
    if (state.tabNames.indexOf(tabName) === -1) {
      state.tabNames.push(tabName)
    }
    state.tabMap[tabName] = {tabName, tableData, message}
    state.currentTab = {tabName, tableData, message}
  },
  CLOSE_TAB (state, tabName) {
    state.tabNames.forEach((tab, index) => {
      if (tab === tabName) {
        state.tabNames.splice(index, 1)
        state.tabMap[tabName] = null
      }
    })
    if (state.currentTab.tabName === tabName) {
      state.currentTab = state.tabMap[state.tabNames[state.tabNames.length - 1]]
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
