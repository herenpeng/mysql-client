<template>
<div class="aside">
    <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-submenu v-for="(conn, index) in connections" :key="index" :index="String(index)" >
            <template slot="title">
                <span>{{ conn.name }}</span>
                <div style="float: right;margin-right: 15px;">
                    <i class="el-icon-refresh" @click="openConn(index)"></i>
                    <i class="el-icon-edit" @click="openUpdateDialog(index)"></i>
                    <i class="el-icon-delete" @click="deleteConnection(index)"></i>
                </div>
            </template>
            <el-submenu v-for="(database, databaseIndex) in databases" :index="String(databaseIndex)" >
                <template slot="title">{{ database.Database }}</template>
                <el-menu-item v-for="(table, tableIndex) in tables" :index="String(tableIndex)">{{ table.TABLE_NAME }}</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>


    <ConnectionDialog/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import dataSource from '@/util/dataSource'
import ConnectionDialog from '@/components/ConnectionDialog'

export default {
  name: 'Aside',
  components: { ConnectionDialog },
  computed: {
    ...mapGetters([
      'connections',
      'conn',
      'connIndex',
      'databaseName'
    ])
  },
  created () {
    store.dispatch('connection/getConnections')
  },
  data () {
    return {
      databases: [],
      tables: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      if (keyPath.length === 1) {
        this.openConn(Number(key))
      } else if (keyPath.length === 2) {
        this.showTables(Number(key))
      }
    },
    handleClose (key, keyPath) {
      if (keyPath.length === 1) {
        this.closeConn()
      } else if (keyPath.length === 2) {
        this.tables = []
      }
    },
    openConn (index) {
      const connection = this.connections[index]
      dataSource.getConn(connection).then(conn => {
        if (conn !== null) {
          store.dispatch('connection/openConn', conn)
          store.dispatch('connection/setConnName', connection.name)
          store.dispatch('connection/setConnIndex', index)
          dataSource.showDatabases(conn).then(data => {
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
      dataSource.closeConn(this.conn)
      store.dispatch('connection/closeConn')
      this.databases = []
    },
    showTables (index) {
      store.dispatch('database/setDatabaseName', this.databases[index].Database)
      dataSource.showTables(this.conn, this.databaseName).then((data) => {
        this.tables = data
      }).catch(err => {
        console.log(err)
        this.$message.error('查看数据库表错误')
      })
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
    overflow-: hidden;
    height: 700px;
}
.el-card {
    cursor: pointer;
}
.el-card:hover {
    background-color: #67C23A;
}
.select{
    background-color: #67C23A;
}
.el-card i {
    padding: 3px;
    border-radius: 5px;
}
.el-card i:hover {
    background-color: #dedede;
}
.el-collapse-item {
    padding-left: 30px;
}
.el-collapse-item:hover {
    background-color: #67C23A;
}
.table {
    padding-left: 10px;
}
.table:hover {
    background-color: #67C23A;
}
</style>
