<template>
<div class="aside">
    <el-menu
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened="true">
        <el-submenu v-for="(conn, index) in connections" :key="index" :index="String(index)" >
            <template slot="title">
                <span>{{ conn.name }}</span>
                <div style="float: right;margin-right: 15px;">
                    <i class="el-icon-refresh" @click="openConn(index)"></i>
                    <i class="el-icon-edit" @click="openUpdateDialog(index)"></i>
                    <i class="el-icon-delete" @click="deleteConnection(index)"></i>
                </div>
            </template>
            <el-submenu v-if="databases" v-for="(database, databaseIndex) in databases"
                        :key="databaseIndex" :index="database.Database" >
                <template slot="title">{{ database.Database }}</template>
                <el-menu-item v-if="tables" v-for="(table, tableIndex) in tables" :key="tableIndex"
                              :index="table.TABLE_NAME" @click="openTable(table.TABLE_NAME)">{{ table.TABLE_NAME }}</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>


</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import mysqlClient from '@/util/mysqlClient'

export default {
  name: 'Aside',
  computed: {
    ...mapGetters([
      'connections',
      'conn',
      'databaseName'
    ])
  },
  created () {
    store.dispatch('connection/getConnections')
  },
  data () {
    return {
      databases: null,
      tables: null
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      if (keyPath.length === 1) {
        this.openConn(Number(key))
      } else if (keyPath.length === 2) {
        this.showTables(key)
      }
    },
    handleClose (key, keyPath) {
      if (keyPath.length === 1) {
        this.closeDatabase()
        this.closeConn()
      } else if (keyPath.length === 2) {
        this.closeDatabase()
      }
    },
    openConn (index) {
      const connection = this.connections[index]
      mysqlClient.getConn(connection).then(conn => {
        if (conn !== null) {
          store.dispatch('connection/openConn', conn)
          store.dispatch('connection/setConnName', connection.name)
          mysqlClient.showDatabases(conn).then(data => {
            if (data !== null) {
              this.databases = data
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('链接失败，请检查网络或链接信息')
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('链接失败，请检查网络或链接信息')
      })
    },
    closeConn () {
      mysqlClient.closeConn(this.conn)
      store.dispatch('connection/closeConn')
      this.databases = null
    },
    closeDatabase () {
      store.dispatch('main/closeDatabase')
      this.tables = null
    },
    showTables (databaseName) {
      store.dispatch('main/setDatabaseName', databaseName)
      mysqlClient.showTables(this.conn, this.databaseName).then((data) => {
        this.tables = data
      }).catch(err => {
        console.log(err)
        this.$message.error('查看数据库表错误')
      })
    },
    openTable (tableName) {
      store.dispatch('main/openTable', tableName)
    },
    openUpdateDialog (updateIndex) {
      store.dispatch('connection/openUpdateDialog', updateIndex)
    },
    deleteConnection (index) {
      this.$confirm('此操作将删除该链接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('connection/deleteConnection', index).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.aside {
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 700px;
}
</style>
