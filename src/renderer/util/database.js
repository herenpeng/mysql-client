const mysql = require('mysql')

// Perform a query
// const $query = 'SELECT * FROM `zero-admin` LIMIT 10'
//
// connection.query($query, function (err, rows, fields) {
//   if (err) {
//     console.log('An error ocurred performing the query.')
//     console.log(err)
//     return
//   }
//
//   console.log('Query succesfully executed', rows)
// })
//
// // Close the connection
// connection.end(function () {
//   // The connection has been closed
// })

export default {
  getConnection (connection) {
    const conn = mysql.createConnection({
      host: connection.host,
      user: connection.username,
      password: connection.password
    })
    conn.connect(function (err) {
      // 如果链接报错
      if (err) {
        console.log(err.code + ':' + err.fatal)
      }
    })
    return conn
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
  }

}
