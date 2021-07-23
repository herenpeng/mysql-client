<template>
  <el-container class="wrap-container">
    <el-header style="padding: 0;">
      <Header/>
    </el-header>
    <el-container>
      <el-aside class="aside-connection">
        <Aside/>
      </el-aside>
      <el-main style="padding: 0;">
        <Main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Main from '@/components/Main'

export default {
  name: 'Index',
  components: { Header, Aside, Main }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
.wrap-container {
  height: 100%;
}
.aside-connection {
  height: 100%;
  width: 300px;
  border-right: 1px solid #e4e0e0;
}
</style>
