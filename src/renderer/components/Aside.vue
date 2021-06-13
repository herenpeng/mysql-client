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
      connectionShowIndex: -1,
      databases: [],
      useDatabaseName: null,
      tables: []
    }
  },
  methods: {
    connection (index) {
      const connection = storage.getConnection(index)
      const conn = database.getConnection(connection)
      if (conn !== null) {
        this.conn = conn
        database.getDatabases(this.conn, (data) => {
          if (data !== null) {
            this.databases = data
            this.connectionShowIndex = index
          }
        })
      }
    },
    closeConnection () {
      this.databases = []
      this.connectionShowIndex = -1
      database.closeConnection(this.conn)
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
        return
      }
      this.useDatabaseName = databaseName
      database.getTables(this.conn, databaseName, (data) => {
        this.tables = data
      })
    }
  }
}
</script>

<style scoped>
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
.table {
    padding-left: 10px;
}
.table:hover {
    background-color: #67C23A;
}
</style>
