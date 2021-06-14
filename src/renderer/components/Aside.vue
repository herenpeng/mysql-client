<template>
<div class="aside">
    <div v-for="(conn, index) in connections" :key="index">
        <el-card shadow="hover" :class="{select : index === connectionShowIndex}">
            <span>{{ conn.name }}</span>
            <div style="float: right;">
                <i class="el-icon-refresh" @click="connection(index)"></i>
                <i class="el-icon-edit" @click="openUpdateConnectionDialog(index)"></i>
                <i class="el-icon-delete" @click="deleteConnection(index)"></i>
                <i class="el-icon-arrow-down" @click="connection(index)" v-if="index !== connectionShowIndex" ></i>
                <i class="el-icon-arrow-up" @click="closeConnection" v-if="index === connectionShowIndex" ></i>
            </div>
        </el-card>
        <el-collapse accordion v-if="index === connectionShowIndex" @change="getTables">
            <el-collapse-item v-for="(database, databaseIndex) in databases" :title="database.Database"
                              :name="database.Database" >
                <div class="table" v-for="(table, tableIndex) in tables">{{ table.TABLE_NAME }}</div>
            </el-collapse-item>
        </el-collapse>
    </div>


    <ConnectionDialog :dialogTitle="dialogTitle" :updateConnectionIndex="updateConnectionIndex" @get-connections="getConnections"/>
</div>
</template>

<script>
import storage from '@/util/storage'
import database from '@/util/database'
import ConnectionDialog from '@/components/ConnectionDialog'

export default {
  name: 'Aside',
  components: { ConnectionDialog },
  props: {
    connections: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dialogTitle: null,
      updateConnectionIndex: -1,
      conn: null,
      connectionName: null,
      connectionShowIndex: -1,
      databases: [],
      useDatabaseName: null,
      tables: []
    }
  },
  watch: {
    conn () {
      this.currentInfo()
    },
    connectionName () {
      this.currentInfo()
    },
    useDatabaseName () {
      this.currentInfo()
    }
  },
  methods: {
    currentInfo () {
      this.$emit('current-info', this.conn, this.connectionName, this.useDatabaseName)
    },
    connection (index) {
      const connection = storage.getConnection(index)
      this.connectionName = connection.name
      database.getConnection(connection, (err, conn) => {
        if (err) {
          this.showMessage(err.message, 'error')
          this.$message.error('链接失败，请检查网络或链接信息')
          return
        }
        if (conn !== null) {
          this.conn = conn
          database.getDatabases(this.conn, (data) => {
            if (data !== null) {
              this.databases = data
              this.connectionShowIndex = index
            }
          })
        }
      })
    },
    closeConnection () {
      database.closeConnection(this.conn)
      this.conn = null
      this.connectionName = null
      this.connectionShowIndex = -1
      this.databases = []
      this.useDatabaseName = null
      this.tables = null
    },
    openUpdateConnectionDialog (index) {
      this.dialogTitle = 'update'
      this.updateConnectionIndex = index
    },
    deleteConnection (index) {
      this.$confirm('此操作将删除该链接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        storage.deleteConnection(index)
        this.$emit('get-connections')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getConnections () {
      this.dialogTitle = null
      this.$emit('get-connections')
    },
    getTables (databaseName) {
      if (!databaseName) {
        this.useDatabaseName = null
        return
      }
      this.useDatabaseName = databaseName
      database.getTables(this.conn, this.useDatabaseName, (data) => {
        this.tables = data
      })
    },
    showMessage (data, type) {
      this.$emit('show-message', data, type)
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
