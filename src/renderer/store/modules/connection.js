const state = {
  connections: null,
  dialogVisible: false,
  dialogTitle: '创建链接',
  updateIndex: -1,
  conn: null,
  connName: null,
  connIndex: -1
}

const mutations = {
  // 加载所有的数据库连接
  LOADED_CONNECTIONS (state) {
    // 获取的字符串
    const connections = localStorage.connections || '[]'
    state.connections = JSON.parse(connections)
  },
  SET_CONNECTIONS (state, connections) {
    // 将所有数据库连接存储到 localStorage
    localStorage.connections = JSON.stringify(connections)
    state.connections = connections
  },
  OPEN_CREATE_DIALOG (state) {
    state.dialogVisible = true
    state.dialogTitle = '创建链接'
  },
  OPEN_UPDATE_DIALOG (state, updateIndex) {
    state.dialogVisible = true
    state.dialogTitle = '更新链接'
    state.updateIndex = updateIndex
  },
  CLOSE_DIALOG (state) {
    state.dialogVisible = false
    state.updateIndex = -1
  },
  // 创建数据库的 socket 链接
  CREATE_CONN (state, conn) {
    state.conn = conn
  },
  CLOSE_CONN (state) {
    state.conn = null
    state.connName = null
    state.connIndex = -1
  },
  SET_CONN_NAME (state, connName) {
    state.connName = connName
  },
  SET_CONN_INDEX (state, connIndex) {
    state.connIndex = connIndex
  }
}

const actions = {
  getConnections ({commit, state}) {
    if (state.connections === null) {
      commit('LOADED_CONNECTIONS')
    }
  },
  setConnections ({commit}, connections) {
    commit('SET_CONNECTIONS', connections)
  },
  // 新增一个数据库链接信息
  createConnection ({commit, state}, connection) {
    return new Promise((resolve) => {
      state.connections.push(connection)
      commit('SET_CONNECTIONS', state.connections)
      resolve()
    })
  },
  // 更新数据库链接信息
  updateConnection ({commit, state}, connection, index) {
    return new Promise((resolve) => {
      state.connections[index] = connection
      commit('SET_CONNECTIONS', state.connections)
      resolve()
    })
  },
  // 删除数据库链接信息
  deleteConnection ({commit, state}, index) {
    return new Promise((resolve) => {
      state.connections.splice(index, 1)
      commit('SET_CONNECTIONS', state.connections)
      resolve()
    })
  },
  openCreateDialog ({commit}) {
    commit('OPEN_CREATE_DIALOG')
  },
  openUpdateDialog ({commit}, updateIndex) {
    commit('OPEN_UPDATE_DIALOG', updateIndex)
  },
  closeDialog ({commit}) {
    commit('CLOSE_DIALOG')
  },
  createConn ({commit}, conn) {
    commit('CREATE_CONN', conn)
  },
  closeConn ({commit}) {
    commit('CLOSE_CONN')
  },
  setConnName ({commit}, connName) {
    commit('SET_CONN_NAME', connName)
  },
  setConnIndex ({commit}, connIndex) {
    commit('SET_CONN_INDEX', connIndex)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
