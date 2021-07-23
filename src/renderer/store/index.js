import Vue from 'vue'
import Vuex from 'vuex'

import connection from './modules/connection'
import main from './modules/main'
import message from './modules/message'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    connection,
    main,
    message
  },
  getters
})
