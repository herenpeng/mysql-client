import Vue from 'vue'
import Vuex from 'vuex'

import connection from './modules/connection'
import command from './modules/command'
import database from './modules/database'
import message from './modules/message'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    connection,
    command,
    database,
    message
  },
  getters
})
