<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside>
        <Aside/>
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

export default {
  name: 'Index',
  components: { Header, Aside, Main }
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
