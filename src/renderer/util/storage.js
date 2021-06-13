export default {
  getSetting (key) {
    let settings = localStorage.getItem('settings')
    settings = settings ? JSON.parse(settings) : {}

    return key ? settings[key] : settings
  },
  saveSettings (settings) {
    settings = JSON.stringify(settings)
    return localStorage.setItem('settings', settings)
  },
  // 获取所有的数据库连接
  getConnections () {
    // 获取的字符串
    let connections = localStorage.connections || '[]'
    connections = JSON.parse(connections)
    return connections
  },
  // 将所有数据库连接存储到 localStorage
  setConnections (connections) {
    localStorage.connections = JSON.stringify(connections)
  },
  // 新增一个数据库链接信息
  addConnection (connection) {
    const connections = this.getConnections()
    connections.push(connection)
    this.setConnections(connections)
  },
  // 查询一个数据库链接信息
  getConnection (index) {
    const connections = this.getConnections()
    return connections[index]
  },
  // 更新数据库链接信息
  updateConnection (connection, index) {
    const connections = this.getConnections()
    connections[index] = connection
    this.setConnections(connections)
  },
  // 删除数据库链接信息
  deleteConnection (index) {
    const connections = this.getConnections()
    connections.splice(index, 1)
    this.setConnections(connections)
  }
}
