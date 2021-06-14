const mysql = require('mysql')

export default {
  getConnection (connection, callback) {
    const conn = mysql.createConnection({
      host: connection.host,
      user: connection.username,
      password: connection.password
    })
    conn.connect(function (err) {
      callback(err, conn)
    })
  },
  getDatabases (conn, callback) {
    conn.query('show databases;',
      function (err, rows, fields) {
        if (err) {
          console.log(err)
          return
        }
        callback(rows)
      }
    )
  },
  closeConnection (conn) {
    conn.end(function () {
    })
  },
  useDatabase (conn, databaseName, callback) {
    conn.query('use `' + databaseName + '`;',
      function (err, rows, fields) {
        if (err) {
          console.log(err)
          return
        }
        callback(rows)
      }
    )
  },
  getTables (conn, databaseName, callback) {
    this.useDatabase(conn, databaseName, (data) => {
      conn.query('select * from information_schema.tables where table_schema = (select database());',
        function (err, rows, fields) {
          if (err) {
            console.log(err)
            return
          }
          callback(rows)
        }
      )
    })
  },
  query (conn, command, callback) {
    const sqlArr = command.split(';')
    for (let sql of sqlArr) {
      if (sql) {
        conn.query(sql,
          function (err, rows, fields) {
            callback(err, rows)
          }
        )
      }
    }
  }

}
