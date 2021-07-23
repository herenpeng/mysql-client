const mysql = require('mysql')

export default {
  getConn (connection) {
    return new Promise((resolve, reject) => {
      const conn = mysql.createConnection({
        host: connection.host,
        user: connection.username,
        password: connection.password
      })
      conn.connect((err) => {
        if (err) {
          reject(err)
        }
        resolve(conn)
      })
    })
  },
  showDatabases (conn) {
    return new Promise((resolve, reject) => {
      conn.query('show databases;', (err, rows, fields) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  },
  closeConn (conn) {
    conn.end(function () {
    })
  },
  useDatabase (conn, databaseName) {
    return new Promise((resolve, reject) => {
      conn.query('use `' + databaseName + '`;', (err, rows, fields) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  },
  showTables (conn, databaseName) {
    return new Promise((resolve, reject) => {
      this.useDatabase(conn, databaseName).then(() => {
        conn.query('select TABLE_NAME from information_schema.tables where table_schema = (select database());', (err, rows, fields) => {
          if (err) {
            reject(err)
          }
          resolve(rows)
        })
      })
    })
  },
  queryTable (conn, tableName) {
    if (tableName) {
      return new Promise((resolve, reject) => {
        conn.query('select * from ' + tableName, (err, rows, fields) => {
          if (err) {
            reject(err)
          }
          resolve(rows)
        })
      })
    }
  },
  query (conn, command) {
    const sqlArr = command.split(';')
    for (let sql of sqlArr) {
      if (sql) {
        return new Promise((resolve, reject) => {
          conn.query(sql, (err, rows, fields) => {
            if (err) {
              reject(err)
            }
            resolve(rows)
          })
        })
      }
    }
  }
}
