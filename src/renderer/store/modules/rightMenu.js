const state = {
  showRightMenu: false
}

const mutations = {
  CHANGE_SHOW_RIGHT_MENU (state, show) {
    state.showRightMenu = show
  }
}

const actions = {
  changeShowRightMenu ({commit}, show) {
    commit('CHANGE_SHOW_RIGHT_MENU', show)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
