<template>
  <el-container>
    <el-header>
      <Header @get-connections="getConnections"
              @open-command="openCommand"/>
    </el-header>
    <el-container>
      <el-aside>
        <Aside :connections="connections"
               @get-connections="getConnections"
               @current-info="currentInfo"
               @show-message="showMessage"
        />
      </el-aside>
      <el-main>
        <Main :info="info" :commandLineShow="commandLineShow" @close-command="closeCommand"
              :errorMessage="errorMessage" @show-message="showMessage"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Main from '@/components/Main'
import storage from '@/util/storage'

export default {
  name: 'Index',
  components: { Header, Aside, Main },
  data () {
    return {
      connections: [],
      commandLineShow: false,
      info: {
        conn: null,
        connectionName: null,
        useDatabaseName: null
      },
      errorMessage: null
    }
  },
  created () {
    this.getConnections()
  },
  methods: {
    getConnections () {
      this.connections = storage.getConnections()
    },
    openCommand () {
      this.commandLineShow = true
    },
    closeCommand () {
      this.commandLineShow = false
    },
    currentInfo (conn, connectionName, useDatabaseName) {
      this.info = {
        conn,
        connectionName,
        useDatabaseName
      }
    },
    showMessage (message) {
      this.errorMessage = message
    }
  }
}
</script>

<style>
.el-header {
  box-shadow: 0 2px 4px rgb(64, 158, 255), 0 0 6px rgb(64, 158, 255);
  line-height: 60px;
  margin-bottom: 10px;
}
.el-main {
  padding-top: 0px;
}
</style>
