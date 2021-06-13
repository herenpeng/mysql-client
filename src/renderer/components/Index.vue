<template>
  <el-container>
    <el-header>
      <Header @get-connections="getConnections"
              @open-command="openCommand"/>
    </el-header>
    <el-container>
      <el-aside>
        <Aside :connections="connections"
               @get-connections="getConnections"/>
      </el-aside>
      <el-main>
        <Main :commandLineShow="commandLineShow" @close-command="closeCommand"/>
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
      commandLineShow: false
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
