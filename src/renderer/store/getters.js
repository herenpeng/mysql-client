const getters = {
  connections: state => state.connection.connections,
  dialogVisible: state => state.connection.dialogVisible,
  updateIndex: state => state.connection.updateIndex,
  conn: state => state.connection.conn,
  connName: state => state.connection.connName,
  databaseName: state => state.main.databaseName,
  tabMap: state => state.tab.tabMap,
  currentTab: state => state.tab.currentTab
}
export default getters
