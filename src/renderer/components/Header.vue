<template>
    <el-menu
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#ffd04b">
        <el-menu-item index="1" @click="openCreateDialog">创建连接
            <i class="el-icon-circle-plus-outline el-icon--right"></i></el-menu-item>
        <el-menu-item index="2" @click="openCommand">打开命令行
            <i class="el-icon-monitor el-icon--right"></i></el-menu-item>
    </el-menu>
</template>

<script>
import store from '@/store'

export default {
  name: 'Header',
  methods: {
    handleSelect () {
    },
    openCreateDialog () {
      store.dispatch('connection/openCreateDialog')
    },
    openCommand () {
      store.dispatch('tab/openTab', {tabName: 'command'})
    }
  }
}
</script>
