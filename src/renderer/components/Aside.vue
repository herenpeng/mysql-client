<template>
<div class="aside">
    <el-scrollbar style="height: 100%;">
        <el-menu
                @open="handleOpen"
                @close="handleClose"
                active-text-color="#ffd04b"
                unique-opened="unique-opened">
            <el-submenu v-for="(conn, index) in connections" :key="index" :index="String(index)" >
                <template slot="title" >
                    <div @contextmenu.prevent="rightClick(index, $event)">
                        <i class="el-icon-link"></i>
                        <span >{{ conn.name }}</span>
                    </div>
                </template>
                <el-submenu v-if="databases" v-for="(database, databaseIndex) in databases"
                            :key="databaseIndex" :index="database.Database">

                    <template slot="title"><i class="el-icon-coin"></i>{{ database.Database }}</template>
                    <el-menu-item v-if="tables" v-for="(table, tableIndex) in tables" :key="tableIndex"
                                  :index="table.TABLE_NAME" @click="openTab(table.TABLE_NAME)">
                        <i class="el-icon-tickets"></i>{{ table.TABLE_NAME }}
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
        <div v-if="showRightMenu" class="right-menu" :style="{top: topNumber+'px', left: leftNumber+'px'}">
            <RightMenu :index="index"></RightMenu>
        </div>
    </el-scrollbar>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import mysqlClient from '@/util/mysqlClient'
import RightMenu from '@/components/RightMenu'

export default {
  name: 'Aside',
  components: { RightMenu },
  computed: {
    ...mapGetters([
      'connections',
      'conn',
      'databaseName',
      'showRightMenu'
    ])
  },
  created () {
    store.dispatch('connection/getConnections')
  },
  data () {
    return {
      databases: null,
      tables: null,
      index: -1,
      topNumber: 0,
      leftNumber: 0
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
    rightClick (index, e) {
      this.index = index
      store.dispatch('rightMenu/changeShowRightMenu', true)
      this.topNumber = e.pageY
      this.leftNumber = e.pageX
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
      store.dispatch('connection/closeDatabase')
      this.tables = null
    },
    showTables (databaseName) {
      store.dispatch('connection/setDatabaseName', databaseName)
      mysqlClient.showTables(this.conn, this.databaseName).then((data) => {
        this.tables = data
      }).catch(err => {
        console.log(err)
        this.$message.error('查看数据库表错误')
      })
    },
    openTab (tabName) {
      mysqlClient.queryTable(this.conn, tabName).then(data => {
        store.dispatch('tab/openTab', {tabName: tabName, tableData: data})
      }).catch(err => {
        console.log(err)
        store.dispatch('tab/openTab', {tabName: tabName, message: {title: this.commandContent, data: err.message, type: 'error'}})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
    height: 750px;
}
.right-menu {
    width: 120px;
    position: fixed;
    z-index: 1000;
    background-color: white;
}
</style>
