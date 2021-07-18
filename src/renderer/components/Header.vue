<template>
    <div>
        <el-button type="primary" @click="openCreateDialog">创建连接<i
                class="el-icon-circle-plus-outline el-icon--right"></i></el-button>

        <el-button type="primary" @click="openCommand">打开命令行
            <i class="el-icon-monitor el-icon--right"></i>
        </el-button>

        <ConnectionDialog/>
    </div>
</template>

<script>
import ConnectionDialog from '@/components/ConnectionDialog'
import store from '@/store'

export default {
  name: 'Header',
  components: { ConnectionDialog },
  methods: {
    openCreateDialog () {
      store.dispatch('connection/openCreateDialog')
    },
    openCommand () {
      store.dispatch('command/openCommand')
    }
  }
}
</script>

<style scoped>
</style>
