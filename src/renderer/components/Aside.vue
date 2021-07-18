<template>
<div class="aside">
    <div v-for="(conn, index) in connections" :key="index">
        <el-card shadow="hover" :class="{select : index === connIndex}">
            <span>{{ conn.name }}</span>
            <div style="float: right;">
                <i class="el-icon-refresh" @click="createConn(index)"></i>
                <i class="el-icon-edit" @click="openUpdateDialog(index)"></i>
                <i class="el-icon-delete" @click="deleteConnection(index)"></i>
                <i class="el-icon-arrow-down" @click="createConn(index)" v-if="index !== connIndex" ></i>
                <i class="el-icon-arrow-up" @click="closeConn" v-if="index === connIndex" ></i>
            </div>
        </el-card>
        <el-collapse accordion v-if="index === connIndex" @change="showTables">
            <el-collapse-item v-for="(database, databaseIndex) in databases" :title="database.Database"
                              :name="database.Database" >
                <div class="table" v-for="(table, tableIndex) in tables">{{ table.TABLE_NAME }}</div>
            </el-collapse-item>
        </el-collapse>
    </div>


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
    createConn (index) {
      const connection = this.connections[index]
      dataSource.getConn(connection).then(conn => {
        if (conn !== null) {
          store.dispatch('connection/createConn', conn)
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
      this.tables = []
    },
    showTables (databaseName) {
      if (!databaseName) {
        return
      }
      store.dispatch('database/setDatabaseName', databaseName)
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
