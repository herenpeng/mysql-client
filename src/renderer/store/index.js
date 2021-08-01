import Vue from 'vue'
import Vuex from 'vuex'

import connection from './modules/connection'
import tab from './modules/tab'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    connection,
    tab
  },
  getters
})
