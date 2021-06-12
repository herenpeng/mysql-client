<template>
    <el-dialog
            :title="dialogTitleMap[dialogTitle]"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
        <el-form label-position="right" label-width="80px" :model="connection" style="width: 300px;">
            <el-form-item label="名称">
                <el-input v-model="connection.name"></el-input>
            </el-form-item>
            <el-form-item label="主机">
                <el-input v-model="connection.host"></el-input>
            </el-form-item>
            <el-form-item label="端口">
                <el-input v-model="connection.port"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="connection.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="connection.password"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="testConnection" style="float: left">测试连接</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTitle==='create'?createConnection():updateConnection()">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import storage from '@/util/storage'

export default {
  name: 'ConnectionDialog',
  props: {
    dialogTitle: {
      type: String,
      default: null
    },
    connectionIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      connection: {
        'name': '',
        'host': '127.0.0.1',
        'port': '3306',
        'username': 'root',
        'password': ''
      },
      dialogVisible: false,
      dialogTitleMap: {
        create: '创建链接',
        update: '更新链接'
      }
    }
  },
  watch: {
    dialogTitle (newValue, oldValue) {
      this.initData(newValue, oldValue)
    },
    connectionIndex (newValue, oldValue) {
      this.initData('update')
    }
  },
  methods: {
    initData (newValue, oldValue) {
      if (newValue === null) {
        this.dialogVisible = false
        return
      }
      this.dialogVisible = true
      if (newValue === 'update') {
        // 更新操作
        this.connection = storage.getConnection(this.connectionIndex)
        return
      }
      if (newValue === 'create') {
        this.connection = {
          'name': '',
          'host': '127.0.0.1',
          'port': '3306',
          'username': 'root',
          'password': ''
        }
      }
    },
    testConnection () {
      this.$message({
        type: 'success',
        message: '连接成功'
      })
    },
    createConnection () {
      storage.addConnection(this.connection)
      this.$emit('get-connections')
    },
    updateConnection () {
      storage.updateConnection(this.connection, this.connectionIndex)
      this.$emit('get-connections')
    },
    handleClose (done) {
      this.$emit('get-connections')
    }
  }
}
</script>

<style scoped>

</style>
