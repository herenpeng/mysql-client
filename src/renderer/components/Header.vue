<template>
    <div>
        <el-button type="primary" @click="openCreateConnectionDialog">创建连接<i
                class="el-icon-circle-plus-outline el-icon--right"></i></el-button>

        <el-button type="primary" @click="openCommand">打开命令行
            <i class="el-icon-monitor el-icon--right"></i>
        </el-button>

        <ConnectionDialog :dialogTitle="dialogTitle" @get-connections="getConnections"/>
    </div>
</template>

<script>
import ConnectionDialog from '@/components/ConnectionDialog'

export default {
  name: 'Header',
  props: {
    commandLineShow: {
      type: Boolean,
      default: false
    }
  },
  components: { ConnectionDialog },
  data () {
    return {
      dialogTitle: null
    }
  },
  methods: {
    openCreateConnectionDialog () {
      this.dialogTitle = 'create'
    },
    openCommand () {
      this.$emit('open-command')
    },
    getConnections () {
      this.dialogTitle = null
      this.$emit('get-connections')
    }
  }
}
</script>

<style scoped>
</style>
