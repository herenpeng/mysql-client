<template>
  <el-container>
    <el-header>
      <Header @get-connections="getConnections"/>
    </el-header>
    <el-container>
      <el-aside>
        <Aside :connections="connections" @get-connections="getConnections"/>
      </el-aside>
      <el-main>
        <Main/>
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
      connections: []
    }
  },
  created () {
    this.getConnections()
  },
  methods: {
    getConnections () {
      this.connections = storage.getConnections()
    }
  }
}
</script>

<style>
.el-header {
  background-color: #dedede;
  line-height: 60px;
  margin-bottom: 5px;
}
.el-aside {
  height: 100%;
  background-color: #dedede;
}
</style>
