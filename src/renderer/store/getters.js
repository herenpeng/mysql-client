const getters = {
  connections: state => state.connection.connections,
  dialogVisible: state => state.connection.dialogVisible,
  dialogTitle: state => state.connection.dialogTitle,
  updateIndex: state => state.connection.updateIndex,
  conn: state => state.connection.conn,
  connName: state => state.connection.connName,
  connIndex: state => state.connection.connIndex,
  showCommand: state => state.main.showCommand,
  databaseName: state => state.main.databaseName,
  tableNames: state => state.main.tableNames,
  defaultTab: state => state.main.defaultTab,
  message: state => state.message.message
}
export default getters
