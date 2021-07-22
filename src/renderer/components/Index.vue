<template>
  <el-container>
    <el-header style="padding: 0;">
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="300px">
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
</style>
