const getters = {
  connections: state => state.connection.connections,
  dialogVisible: state => state.connection.dialogVisible,
  updateIndex: state => state.connection.updateIndex,
  conn: state => state.connection.conn,
  connName: state => state.connection.connName,
  showCommand: state => state.main.showCommand,
  databaseName: state => state.main.databaseName,
  tabNames: state => state.main.tabNames,
  currentTab: state => state.main.currentTab,
  tableData: state => state.main.tableData,
  message: state => state.message.message
}
export default getters
