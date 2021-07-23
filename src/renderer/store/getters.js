const getters = {
  connections: state => state.connection.connections,
  dialogVisible: state => state.connection.dialogVisible,
  updateIndex: state => state.connection.updateIndex,
  conn: state => state.connection.conn,
  connName: state => state.connection.connName,
  showCommand: state => state.main.showCommand,
  databaseName: state => state.main.databaseName,
  tableNames: state => state.main.tableNames,
  defaultTab: state => state.main.defaultTab,
  tableData: state => state.main.tableData,
  message: state => state.message.message
}
export default getters
